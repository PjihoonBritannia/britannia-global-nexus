
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client with the service role key (admin privileges)
    const supabaseAdmin = createClient(
      // Use direct URLs, not environment variables
      "https://jdhitkznmwltslilihxa.supabase.co",
      // Use service role key (not to be exposed on client side)
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );
    
    // Create admin user if it doesn't exist
    const { data: existingUsers, error: searchError } = await supabaseAdmin
      .from("auth.users")
      .select("*")
      .eq("email", "pjihoon@britannia.co.kr")
      .limit(1);
    
    if (searchError) {
      console.error("Error checking for existing user:", searchError);
      return new Response(JSON.stringify({ error: "Failed to check for existing user" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    // If user doesn't exist, create it
    if (!existingUsers || existingUsers.length === 0) {
      // Create user
      const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
        email: "pjihoon@britannia.co.kr",
        password: "1234",
        email_confirm: true,
        user_metadata: {
          full_name: "Admin User",
        }
      });
      
      if (error) {
        console.error("Error creating user:", error);
        return new Response(JSON.stringify({ error: "Failed to create admin user" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }
      
      // Assign admin role
      if (user) {
        const { error: roleError } = await supabaseAdmin
          .from("user_roles")
          .insert({
            user_id: user.user.id,
            role: "admin"
          });
          
        if (roleError) {
          console.error("Error setting admin role:", roleError);
          return new Response(JSON.stringify({ error: "Failed to set admin role" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          });
        }
      }
      
      return new Response(JSON.stringify({ success: true, message: "Admin user created successfully" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      // User already exists
      return new Response(JSON.stringify({ success: true, message: "Admin user already exists" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
