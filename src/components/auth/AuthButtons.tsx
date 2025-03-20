import { Button } from "@/components/ui/button";

export default function AuthButtons() {
    return (
        <div className="flex-1 flex gap-3 md:flex-row flex-col relative z-50">
            <Button className="md:w-1/2 w-full" variant="outline">
                Sign Up
            </Button>
            <Button className="md:w-1/2 w-full">
                Login
            </Button>
        </div>
    )
}