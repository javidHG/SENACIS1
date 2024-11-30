"use client";

import { fromJSON } from "postcss";
import{
    Dialog,DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
}from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/use-exit-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const ExitModal =()=> {
    const router = useRouter();
    const [isClient, setIsClient]= useState(false);
    const { isOpen, close}= useExitModal ();

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
                        src="/mascot_sad.svg"
                        alt="Mascot"
                        height={80}
                        width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                    Espera, ¡no te vayas!
                    </DialogTitle>
                    <DialogDescription>
                    Estás a punto de terminar la lección. ¿Estás seguro?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" 
                        className="w-full"
                         size="lg" 
                         onClick={close}>
                            Seguir aprendiendo
                        </Button>
                        <Button variant="dangerOutline"
                         className="w-full"
                          size="lg" 
                          onClick={() => {
                            close();
                            router.push("/learn")
                          }}>
                            Salir de la lección
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};