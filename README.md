# FlowDesk — Modular Business Operations Platform

FlowDesk is a modular business operations platform designed for small and medium businesses. It provides a customizable foundation for managing customers, transactions, workflows, schedules, billing, documents, and reporting. 

Industry-specific terminology and workflows can be adapted dynamically through configurable business profiles.

---

## Live Adaptive Profiles (Vocabulary Adaptability)

FlowDesk includes a dynamic configuration engine that adapts the vocabulary of the dashboard to match the client's industry:
*   **Training Center Profile**: Tracks *Students* (Records), *Enrollments* (Transactions), *Courses*, and *Instructors*.
*   **Clinic Profile**: Tracks *Patients* (Records), *Appointments* (Transactions), *Treatments*, and *Doctors*.
*   **Logistics Profile**: Tracks *Shippers* (Records), *Shipment Bookings* (Transactions), *Deliveries*, and *Dispatchers*.
*   **Distributor Profile**: Tracks *Retailers / Accounts* (Records), *Purchase Orders* (Transactions), *Product Lines*, and *Sales Reps*.
*   **Professional Services Profile**: Tracks *Clients* (Records), *Service Tickets* (Transactions), *Ticket Categories*, and *Agents*.

---

## Technical Stack

*   **Framework**: Vite + React + TypeScript
*   **Styling**: Tailwind CSS v4
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **Routing**: React Router Dom v7

---

## Getting Started

To compile and launch the application:

```bash
# Install dependencies (if you haven't already)
bun install

# Verify successful compilation and build
bun run build

# Start local development server
bun run dev
```

Open [http://localhost:5173/](http://localhost:5173/) to interact with the system.
