import { Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

interface Transaction {
  transactionId: string;
  timestamp: string;
  amount: string;
  currency: string;
  status: string;
}

@Injectable()
export class ReconciliationService {
  async reconcile(fileA: Express.Multer.File, fileB: Express.Multer.File) {
    const systemAMap = await this.parseCSV(fileA.buffer);
    const systemBMap = await this.parseCSV(fileB.buffer);

    const missingInB: string[] = [];
    const missingInA: string[] = [];
    const amountMismatches: string[] = [];
    const statusMismatches: string[] = [];

    // Find transactions in A but missing/mismatched in B
    for (const [id, txnA] of systemAMap.entries()) {
      const txnB = systemBMap.get(id);

      if (!txnB) {
        missingInB.push(id);
      } else {
        if (txnA.amount !== txnB.amount) {
          amountMismatches.push(id);
        }
        if (txnA.status !== txnB.status) {
          statusMismatches.push(id);
        }
        // Remove matched entries to make finding missingInA easier
        systemBMap.delete(id);
      }
    }

    // Remaining in systemBMap are missing in A
    for (const id of systemBMap.keys()) {
      missingInA.push(id);
    }

    return {
      summary: {
        missingInB: missingInB.length,
        missingInA: missingInA.length,
        amountMismatches: amountMismatches.length,
        statusMismatches: statusMismatches.length,
      },
      details: {
        missingInB,
        missingInA,
        amountMismatches,
        statusMismatches,
      },
    };
  }

  private parseCSV(buffer: Buffer): Promise<Map<string, Transaction>> {
    return new Promise((resolve, reject) => {
      const map = new Map<string, Transaction>();

      const stream = Readable.from(buffer).pipe(csvParser());

      stream.on('data', (row) => {
        const transaction: Transaction = {
          transactionId: row.transactionId,
          timestamp: row.timestamp,
          amount: row.amount,
          currency: row.currency,
          status: row.status,
        };
        map.set(transaction.transactionId, transaction);
      });

      stream.on('end', () => {
        resolve(map);
      });

      stream.on('error', (err) => {
        reject(err);
      });
    });
  }
}
