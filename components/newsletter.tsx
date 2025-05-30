"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2 } from "lucide-react"
import { addNewsLetter } from "@/services/NewsLetterSerice"
import Link from "next/link"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

// Submit Handeler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const result = await addNewsLetter(email);

        if (result.success) {
          setIsSubmitted(true);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Failed to submit:", error);
      }
    }
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 md:p-12">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Stay Updated with Eventilyze</h2>
            <p className="mt-2 text-muted-foreground">Subscribe to our newsletter for the latest events and updates</p>
          </div>

          {isSubmitted ? (
            <motion.div
              className="mt-8 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Thank You for Subscribing!</h3>
              <p className="mt-2 text-center text-muted-foreground">
                You'll now receive our latest updates and event recommendations.
              </p>
            </motion.div>
          ) : (

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col justify-center gap-4 sm:flex-row">

                {/* Inpute Email */}
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-auto max-w-[300px]"
                  required
                />

                <Button type="submit" size="lg">
                  Subscribe
                </Button>

              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                By subscribing, you agree to our{" "}
                <Link href="/terms-of-service" className="underline underline-offset-2">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                
              </p>
            </form>

          )}
        </div>
      </div>
    </section>
  )
}
