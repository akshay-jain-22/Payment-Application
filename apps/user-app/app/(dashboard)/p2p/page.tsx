import { SendCard } from "../../../components/SendCard";
import { P2PTransactions } from "../../../components/P2PTransactions";

async function getP2PTransactions() {
    const res = await fetch("http://localhost:3001/api/p2ptransactions", { cache: "no-store" });
    const data = await res.json();
    return (data.transactions || []).map((t: any) => ({
        timestamp: t.timestamp,
        amount: t.amount,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId
    }));
}

export default async function P2PPage() {
    const transactions = await getP2PTransactions();
    return <div className="w-full">
        <SendCard />
        <P2PTransactions transactions={transactions} />
    </div>;
}