'use client';
import Decoder from "@/components/Decoder/Decoder";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <Decoder/>
        </QueryClientProvider>
    )
}