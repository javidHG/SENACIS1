"use client";

import { fromJSON } from "postcss";
import{
    Dialog,DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
}from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import {usePracticeModal } from "@/store/use-practice-modal.";
import Image from "next/image";
import { useEffect, useState } from "react";


export const PracticeModal =()=> {

    const [isClient, setIsClient]= useState(false);
    const { isOpen, close}= usePracticeModal ();

    useEffect(() => setIsClient(true), []);

    if (!isClient){
        return null;
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-mb">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                        src="/heart.svg"
                        alt="Heart"
                        height={100}
                        width={100}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                    Lección de practica
                    </DialogTitle>
                    <DialogDescription>
                    Utilica la lección de práctica para recuperar corazones y puntos. 
                    No puedes perder corazones o puntos en la lección de práctica.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary"
                         className="w-full"
                          size="lg" 
                          onClick={close}
                          >
                            Entiendo
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};