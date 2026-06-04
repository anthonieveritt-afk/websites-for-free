import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = await params;
  const supabase = createServiceClient();
  const { data: app } = await supabase.from("applications").select("*").eq("id", id).single();

  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const brief = `
WEBSITE BUILD BRIEF
===================
Generated: ${new Date().toLocaleString("en-GB")}

CLIENT
------
Business:       ${app.business_name}
Industry:       ${app.industry ?? "—"}
Contact:        ${app.contact_name}
Email:          ${app.email}
Phone:          ${app.phone ?? "—"}
Location:       ${app.location ?? "—"}
Current Site:   ${app.current_website ?? "None"}

PACKAGE
-------
Plan:           ${app.package?.toUpperCase() ?? "Not set"}
Basic Shop:     ${app.wants_basic_shop ? "Yes (+£10/mo)" : "No"}
Coupon Code:    ${app.coupon_code ?? "None"}

WEBSITE GOALS
-------------
${(app.goals ?? []).map((g: string) => `• ${g}`).join("\n") || "None specified"}

IDEAL CUSTOMERS
---------------
${app.ideal_customers ?? "Not specified"}

FEATURES NEEDED
---------------
${(app.features_wanted ?? []).map((f: string) => `• ${f}`).join("\n") || "None specified"}

PAGES
-----
Estimated page count: ${app.page_count ?? "Not specified"}

DOMAIN
------
Status:         ${app.domain_status ?? "Not sure"}
Existing:       ${app.existing_domain ?? "—"}

BRANDING
--------
Brand colours:  ${app.brand_colours ?? "Not specified"}
Logo:           ${app.logo_url ? "Uploaded" : "Not yet uploaded"}

COMPETITOR REFERENCES
---------------------
${app.competitor_urls ?? "None provided"}

SOCIAL LINKS
------------
${JSON.stringify(app.social_links ?? {}, null, 2)}

ADDITIONAL NOTES FROM CLIENT
-----------------------------
${app.special_notes ?? "None"}

SOURCE
------
How they found us: ${app.how_found ?? "—"}
Timeline:          ${app.timeline ?? "—"}
Applied:           ${new Date(app.created_at).toLocaleString("en-GB")}
`.trim();

  return new NextResponse(brief, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="brief-${app.business_name.replace(/\s+/g, "-").toLowerCase()}.txt"`,
    },
  });
}
