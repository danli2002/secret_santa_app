"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            participants: [{name: "", email: "" }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "participants",
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        fetch("http://127.0.0.1:5000/send-recipients", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-x-4">
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
                        {/* <Button
                            type="button"
                            className="bg-red-500"
                            onClick={() => remove(index)}
                        >
                            Remove
                        </Button> */}
                        <X 
                            type="button"
                            onClick={() => remove(index)}
                            color="#ff0000"
                            className="flex items-center"
                        />
                    </div>
                ))}

                <div className="flex justify-center">
                    <Button
                        type="button"
                        className="bg-blue-500"
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
