"use client"

import Image from "next/image";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button"

import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
import officer from "./../officer.json";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import ListFormField from "@/components/ListFormField";
import Lottie from "lottie-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {BsArrowRightCircleFill} from 'react-icons/bs'
import loading from "./../sending.json";
import success from "./../bit-loading.json";
import TransactionStatus from "./TransactionStatus";
export interface setValuehandlerProps {
  attribute: "company" | "days";

  value: string;
}

const companiesArray = [
  { value: "amz", label: "Amazon, Seattle, USA" },
  { value: "apl", label: "Apple, Cupertino, USA" },
  { value: "goog", label: "Google, Mountain View, USA" },
  { value: "msft", label: "Microsoft, Redmond, USA" },
  { value: "fb", label: "Facebook, Menlo Park, USA" },
  { value: "tsla", label: "Tesla, Palo Alto, USA" },
  { value: "onlyfans", label: "OnlyFans, London, UK" },
  { value: "netflix", label: "Netflix, Los Gatos, USA" },
  { value: "alibaba", label: "Alibaba, Hangzhou, China" },
  { value: "tencent", label: "Tencent, Shenzhen, China" },
  { value: "samsung", label: "Samsung, Seoul, South Korea" },
];

const accountFormSchema = z.object({
  company: z.string({ required_error: "Please select a company" }),
  days: z.number({ required_error: "Please enter aleast 2 digit numbers" })
  .min(2, {
    message: "You must become CEO for atleast 10 days",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function Home() {

  companiesArray.forEach(company => {
    company.value = company.label;
  });
  
  const [open, setOpen] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      // company: OnlyFans,
    },
    
  });
  function setVlaueHandler({ attribute, value }: setValuehandlerProps) {
    form.setValue(attribute, value);
  }


  function onSubmit(values: z.infer<typeof accountFormSchema>) {
    console.log(values);
    setOpen((prev) => !prev);
  }


  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to set isVisible to false after 5 seconds
    let timeout: any;
    if (open) {
      console.log("now false");

      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    }

    // Clear the timeout to prevent memory leaks
    return () => {
      if (!open) {
        clearTimeout(timeout);
        setIsVisible(true);
        console.log("now true");
      }
    };
  }, [open]);

  return (
    <div className="h-[100dvh] w-screen flex justify-center items-center flex-col p-8">
         <Lottie animationData={officer} loop={true} className={`flex h-40 w-40`} />



         <Form {...form}>

      
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <ListFormField
            name="company"
            form_control={form.control}
            placeholder="Choose your company"
            command_placeholder="Search business industry"
            form_label="In which company you want to become CEO"
            form_description="Choose carefully, you are going viral internationally"
            listItem={companiesArray}
            formSetValueHandler={setVlaueHandler}
          />

          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>For how many days</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter how many days.."
                    {...field}
                    onChange={(e) =>
                      form.setValue("days", e.target.valueAsNumber)
                    }
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                 You must enter atleast 10, that is the minimum agreement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="space-x-2">
            <span>Make me CEO</span> <BsArrowRightCircleFill size={22} />
          </Button>
        </form>
      </Form>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-w-[320px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {`${form.getValues().company}`}{" "}
            </DialogTitle>
            <DialogDescription>
              <TransactionStatus company={form.getValues().company}  />
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-center items-center h-60 ">
            <Lottie
              animationData={loading}
              loop={true}
              className={`${isVisible ? `flex` : `hidden`} h-60 w-60`}
            />

            <Lottie
              animationData={success}
              loop={true}
              className={`${
                !isVisible ? `flex` : `hidden`
              } object-cover h-60 w-60`}
            />
          </div>
          <DialogFooter className="w-full flex">
            <DialogClose asChild className="w-full">
              <Button className="w-full">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>



         <div className="absolute bottom-10">
        <TwitterFollowButton screenName={"asitdixitt"} />
      </div>

      <p className="absolute bottom-[8px] space-x-1 ">
        <span className="text-sm">Currently building</span>
        <Link
          href={"https://buildrbase.com/"}
          className="text-blue-600 text-md font-medium underline"
        >
          buildrbase.com
        </Link>
      </p>
    </div>
  );
}
