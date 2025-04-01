'use client'

import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

export default function AuthButtons() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="flex-1 flex gap-3 md:flex-row flex-col relative z-50">
            <RegisterLink className="flex-1" onClick={() => setIsLoading(true)}>
                <Button className="w-full cursor-pointer" variant="outline" disabled={isLoading}>
                    Sign Up
                </Button>
            </RegisterLink>
            <LoginLink className="flex-1" onClick={() => setIsLoading(true)}>
                <Button className="w-full cursor-pointer" disabled={isLoading}>
                    Login
                </Button>
            </LoginLink>
        </div>
    )
}