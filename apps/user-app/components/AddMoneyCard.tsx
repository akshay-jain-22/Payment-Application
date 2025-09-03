"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";
import { useRouter } from "next/navigation";
import { TextInput } from "@repo/ui/textinput";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" }
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const router = useRouter();

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(value) => setAmount(Number(value))}
        />
        <div className="py-4 text-left"><span>Bank</span></div>
        <Select
          onSelect={(value) => {
            const bank = SUPPORTED_BANKS.find((x) => x.name === value);
            setRedirectUrl(bank?.redirectUrl || "");
            setProvider(bank?.name || "");
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(amount * 100, provider);
              router.refresh();
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
