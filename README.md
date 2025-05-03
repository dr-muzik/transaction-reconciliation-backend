## Project Description

Building a backend service to reconcile and report discrepancies in financial transaction records between two systems: SourceSystemA and SourceSystemB. Each system provides daily CSV files (potentially with 1 million+ rows) that list transaction IDs, timestamps, amounts, currencies, and status (e.g., SUCCESS, FAILED).

## Goals

1. Load and parse both files efficiently.
2. Detect and return:
   ○ Transactions present in A but missing in B (and vice versa)
   ○ Amount mismatches
   ○ Status mismatches
3. Expose the results via a REST API.

## Expected Deliverables:

● Backend service (preferably using Node.js/NestJS or Python/Django)
● Efficient file handling (streaming/parsing large data)
● REST endpoint: /reconcile
● README with setup instructions

## Evaluation Criteria:

● Efficiency and memory use when handling large files
● Use of appropriate data structures (hash maps, sets)
● Clean RESTful architecture and code structure
● Error handling and validations
