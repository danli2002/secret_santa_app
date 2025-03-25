"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

const formSchema = z.object({
    participants: z.array(
        z.object({
            name: z.string().nonempty(),
            email: z.string().email(),
        })
    ),
})

export function InputForm() {
    const [alertMessage, setAlertMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            participants: [{ name: "", email: "" }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "participants",
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.participants.length < 2) {
            setAlertMessage("You must have at least two participants.")
            return
        }

        setAlertMessage(null) 

        fetch("/api/send-recipients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {alertMessage && (
                    <Alert className="bg-red-100">
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                )}

                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-x-4">
                        <FormField
                            control={form.control}
                            name={`participants.${index}.name`}
                            render={({ field }) => (
                                <FormItem>
                                    {index === 0 && <FormLabel>Name</FormLabel>}
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`participants.${index}.email`}
                            render={({ field }) => (
                                <FormItem>
                                    {index === 0 && <FormLabel>Email</FormLabel>}
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {index > 0 && (
                            <X
                                type="button"
                                onClick={() => remove(index)}
                                className="cursor-pointer"
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <Button
                        type="button"
                        onClick={() => append({ name: "", email: "" })}
                    >
                        Add Participant
                    </Button>
                </div>
                <Button type="submit" className="bg-green-500">Submit</Button>
            </form>
        </Form>
    )
}
