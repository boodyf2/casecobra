"use server";
import { prisma } from "@/prisma";
import {
    CaseColor,
    CaseFinish,
    CaseMaterial,
    PhoneModel,
} from "@prisma/client";

export interface SaveConfigArgs {
    configId: string;
    color: CaseColor;
    phoneModel: PhoneModel;
    caseMaterial: CaseMaterial;
    caseFinish: CaseFinish;
}

export const saveConfig = async ({
    configId,
    color,
    phoneModel,
    caseMaterial,
    caseFinish,
}: SaveConfigArgs) => {
    await prisma.configuration.update({
        where: { id: configId },
        data: { color, phoneModel, caseMaterial, caseFinish },
    });
};
