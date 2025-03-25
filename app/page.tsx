// import Image from "next/image";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
import { InputForm } from "./input_form";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-10 pb-20 gap-16 font-[family-name:var(--font-geist-sans)] space-y-6">
      <div>
      <p className="text-5xl font-bold text-center">Secret Santa</p>
      </div>

      <div>
      <p className="text-5 text-center">Secret Santa assignments without the fuss.</p>
      </div>

      <div className=" rounded-lg">
        {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex justify-between items-center p-4 bg-gray-300 rounded-lg cursor-pointer">
              <span className="text-lg font-semibold">How It Works</span>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter participating names and emails.</li>
                <li>Click funny red button.</li>
                <li>???</li>
                <li>Profit.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Enter participating names and emails.</li>
          <li>When done, press the submit button, and participants will be notified of who they will be gifting to, via email.</li>
        </ol>
      </div>
      <InputForm/>
    </div>
  );
}
