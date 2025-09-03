
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getTransactions() {
    const res = await fetch("http://localhost:3001/api/transactions", { cache: "no-store" });
    const data = await res.json();
    // Map to expected format for OnRampTransactions
    return (data.transactions || []).map((t: any) => ({
        time: new Date(t.startTime),
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}

export default async function TransactionsPage() {
    const transactions = await getTransactions();
    return <OnRampTransactions transactions={transactions} />;
}