
"use server";

import { POINTS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export const upsertUserProgress = async (courseId: number) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user) {
        throw new Error("No estas autorizado");
    }

    const course = await getCourseById( courseId);

    if(!course) {
        throw new Error("Curso no encontrado");
    }

    

   if(!course.units.length || !course.units[0].lessons.length) {
       throw new Error("El curso está vacío");
    }

const existingUserProgress = await getUserProgress();
    if(existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
        
    }
    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}

export const reduceHearts = async (challengeId: number) => {
    const {userId} = await auth ();

    if(!userId) {
        throw new Error ("No autorizado");
    }

    const currentUserProgress = await getUserProgress();
    //llama la subscripción del usuario 

    const challenge = await db.query.challenges.findFirst({
        where:eq(challenges.id, challengeId),
    });

    if (!challenge){
        throw new Error("Reto no encontrado");
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    });
    const isPractice = !!existingChallengeProgress;

    if (isPractice){
        return {error:  "Practica"};
    }

    if(!currentUserProgress){
        throw new Error("Progreso del usuario no encontrado");
    }
    //tp:manejar la suscripción


    if(currentUserProgress.hearts === 0){
        return {error:"Corazones"};
    }

    await db.update(userProgress).set({
        hearts:Math.max(currentUserProgress.hearts - 1, 0),

    }).where(eq(userProgress.userId, userId));

    revalidatePath("/Shop");
    revalidatePath("/learn");
    revalidatePath("/quest");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};

export const refilHearts =  async () => {
    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) {
        throw new Error("Progreso del usuario no encontrado")
    }
    if (currentUserProgress.hearts === 5){
        throw new Error("Los corazones ya están llenos")
    }
    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("No hay suficientes puntos")
    }
    await db.update(userProgress).set({
        hearts:5,
        points: currentUserProgress.points - POINTS_TO_REFILL,
    }).where(eq(userProgress.userId,currentUserProgress.userId));

    revalidatePath("/shop")
    revalidatePath("/learn")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
}