import Link from "next/link";

export default function page() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Delphi Page</h1>
      <div className="max-w-5xl mx-auto py-10 grid grid-cols-3 gap-10 text-black text-center">
        <Link href="/delphi/race-results">
          <div className="border rounded-lg p-10">Race Results</div>
        </Link>
        <Link href={"/delphi/breeders"}>
          <div className="border rounded-lg p-10">Breeders Address Book</div>
        </Link>
        <Link href={"/delphi/event-inventory"}>
          <div className="border rounded-lg p-10">Event Inventory</div>
        </Link>
      </div>
    </div>
  );
}
