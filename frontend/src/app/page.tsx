'use client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Decoder from "@/components/Decoder/Decoder";

const queryClient = new QueryClient();

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <Decoder/>
        </QueryClientProvider>
    )
}