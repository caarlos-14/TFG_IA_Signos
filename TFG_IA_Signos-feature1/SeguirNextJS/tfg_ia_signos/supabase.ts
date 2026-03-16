import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://hylpbcmxnnlbcpiygfkq.supabase.co";
const supabaseKey = "sb_publishable_13yCGQFkDaX3eKSSnZS5Ig_FktWb_U5";

export const supabase = createClient(supabaseUrl, supabaseKey);