

import { Resend } from "resend";


export const resendSetup = new Resend(process.env.RESEND_API_KEY!);