import { createServiceClient } from "@/lib/supabase/server";
import MediaGrid from "./MediaGrid";

export const dynamic = "force-dynamic";

async function getFiles() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.storage.from("client-uploads").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!data) return [];
    return data
      .filter((f: { name: string; metadata?: { size?: number }; created_at?: string }) => f.name !== ".emptyFolderPlaceholder")
      .map((f: { name: string; metadata?: { size?: number }; created_at?: string }) => ({
        name: f.name,
        size: f.metadata?.size ?? 0,
        created_at: f.created_at ?? "",
        url: supabase.storage.from("client-uploads").getPublicUrl(f.name).data.publicUrl,
      }));
  } catch { return []; }
}

export default async function MediaPage() {
  const files = await getFiles();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Media Library</h1>
          <p className="text-gray-500 mt-1">All client uploads — logos, hero photos, gallery images.</p>
        </div>
        <div className="text-sm text-gray-400">{files.length} files</div>
      </div>
      <MediaGrid files={files} />
    </div>
  );
}
