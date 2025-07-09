"use client";
import { MyLofts } from "@/components/columns";
import ComboBox, { OptionsType } from "@/components/combo-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getLoft, listLoftBirds, listMyLofts } from "@/lib/api/loft";
import { capturePayment, getRace, registerRace } from "@/lib/api/race";
import { ListRaces } from "@/lib/types";
import { useDebounce } from "@/lib/use-debounce";
import useUserStore from "@/store/store";
import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

type LoftBird = {
  id: string;
  name: string;
  bandNumber: string;
  breed: string | null;
  color: string | null;
  age: number | null;
  penNumber: string | null;
  rfIdTag: string | null;
};

export default function page({
  params,
}: {
  params: Promise<{ raceId: string }>;
}) {
  const { raceId } = use(params);
  const router = useRouter();
  const { data, error, isError, isPending, isSuccess } = getRace({
    params: {},
    raceId,
  });
  const [selectedLoft, setSelectedLoft] = useState<MyLofts | null>(null);
  const [selectedBirds, setSelectedBirds] = useState<LoftBird[]>([]);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess && !data) {
    router.push("/races");
  }

  const race: ListRaces = data?.data;

  if (race.status !== "UPCOMING") {
    return (
      <div className="max-w-5xl mx-auto p-6 h-96 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Registration Closed</h1>
        <p className="text-gray-600">
          The registration for this race is closed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-10 sm:h-64 lg:h-96 relative">
        <div className="max-w-2xl">
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-semibold tracking-wider uppercase">
            Chasing the sky one feather at a time
          </h1>
        </div>
      </div>
      <CountDown race={race} />
      <div className="bg-gradient-to-r from-primary to-white text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 py-4 text-white">
          {race.name}
        </h1>
      </div>
      <div className="max-w-5xl mx-auto">
        <RaceInformation race={race} />
        <OwnerInformation
          selectedLoft={selectedLoft}
          setSelectedLoft={setSelectedLoft}
        />
        {selectedLoft && (
          <BirdInformation
            selectedLoft={selectedLoft}
            selectedBirds={selectedBirds}
            setSelectedBirds={setSelectedBirds}
          />
        )}
        {selectedBirds.length > 0 && (
          <PaymentInformation race={race} selectedBirds={selectedBirds} />
        )}
      </div>
    </div>
  );
}

function RaceInformation({ race }: { race: ListRaces }) {
  return (
    <div className="p-6 sm:p-8 lg:p-10 w-full border-b">
      <h2 className="font-bold text-secondary mb-4 text-2xl md:text-3xl lg:text-4xl">
        Race Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label>Race Name</Label>
          <Input value={race.name} className="mt-2 h-12" readOnly />
        </div>
        <div>
          <Label>Race Distance</Label>
          <Input
            value={`${race.distanceKm} km`}
            className="mt-2 h-12"
            readOnly
          />
        </div>
        <div>
          <Label>Race Date</Label>
          <Input
            value={new Date(race.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            className="mt-2 h-12"
            readOnly
          />
        </div>
        <div>
          <Label>From Location</Label>
          <Input value={race.startLocation} className="mt-2 h-12" readOnly />
        </div>
        <div>
          <Label>To Location</Label>
          <Input value={race.endLocation} className="mt-2 h-12" readOnly />
        </div>
      </div>
    </div>
  );
}

function OwnerInformation({
  selectedLoft,
  setSelectedLoft,
}: {
  selectedLoft: MyLofts | null;
  setSelectedLoft: (loft: MyLofts) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm.trim().toLowerCase());

  const { data, isError, isPending, isSuccess } = listMyLofts({
    params: { search: debouncedSearchTerm },
  });

  const lofts = (data?.data as MyLofts[]) || [];
  const options: OptionsType = Array.isArray(lofts)
    ? lofts.map((loft) => ({
        label: `${loft.name}`,
        data: loft,
      }))
    : [];

  const { userData } = useUserStore();
  return (
    <div className="p-6 sm:p-8 lg:p-10 w-full border-b">
      <h2 className="font-bold text-secondary mb-4 text-2xl md:text-3xl lg:text-4xl">
        Owner Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <div>
          <Label>Name</Label>
          <Input value={userData?.user?.name} className="mt-2 h-12" readOnly />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={userData?.user?.email} className="mt-2 h-12" readOnly />
        </div>
        <div>
          <Label>Loft Name</Label>
          <ComboBox
            className="mt-2 h-12"
            searchTerm={searchTerm}
            options={options}
            setSearchTerm={setSearchTerm}
            isPending={isPending}
            isError={isError}
            isSuccess={isSuccess}
            onSelect={async (loft: MyLofts) => {
              setSelectedLoft(loft);
              setSearchTerm("");
            }}
          />
        </div>
        <div>
          <Label>Loft Id</Label>
          <Input
            value={selectedLoft ? selectedLoft.loftId : ""}
            className="mt-2 h-12"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

function BirdInformation({
  selectedLoft,
  selectedBirds,
  setSelectedBirds,
}: {
  selectedLoft: MyLofts;
  selectedBirds: LoftBird[];
  setSelectedBirds: (birds: LoftBird[]) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm.trim().toLowerCase());
  const { data, error, isError, isPending, isSuccess } = listLoftBirds({
    params: { search: debouncedSearchTerm },
    loftId: selectedLoft.id,
  });

  const birds: LoftBird[] = data?.data || [];
  const options: OptionsType = Array.isArray(birds)
    ? birds.map((bird) => ({
        label: `${bird.name} - ${bird.bandNumber}`,
        data: bird,
      }))
    : [];

  const handleAddBird = (bird: LoftBird) => {
    if (!selectedBirds.find((b) => b.id === bird.id)) {
      setSelectedBirds([...selectedBirds, bird]);
    }
  };

  const handleRemoveBird = (birdId: string) => {
    setSelectedBirds(selectedBirds.filter((bird) => bird.id !== birdId));
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 w-full">
      <h2 className="font-bold text-secondary mb-4 text-2xl md:text-3xl lg:text-4xl">
        Bird Information
      </h2>

      <div className="mb-6">
        <Label>Search and Add Birds</Label>
        <ComboBox
          className="mt-2 h-12"
          searchTerm={searchTerm}
          options={options}
          setSearchTerm={setSearchTerm}
          isPending={isPending}
          isError={isError}
          isSuccess={isSuccess}
          onSelect={async (bird: LoftBird) => {
            handleAddBird(bird);
            setSearchTerm("");
          }}
          placeholder="Search for birds..."
        />
      </div>

      {selectedBirds.length > 0 && (
        <div className="space-y-4">
          {selectedBirds.map((bird, index) => (
            <div key={bird.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-lg">Bird #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveBird(bird.id)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Bird Name</Label>
                  <Input value={bird.name} className="mt-2 h-12" readOnly />
                </div>
                <div>
                  <Label>Band Number</Label>
                  <Input
                    value={bird.bandNumber}
                    className="mt-2 h-12"
                    readOnly
                  />
                </div>
                <div>
                  <Label>Breed</Label>
                  <Input
                    value={bird.breed || "N/A"}
                    className="mt-2 h-12"
                    readOnly
                  />
                </div>
                <div>
                  <Label>Color</Label>
                  <Input
                    value={bird.color || "N/A"}
                    className="mt-2 h-12"
                    readOnly
                  />
                </div>
                <div>
                  <Label>Age</Label>
                  <Input
                    value={bird.age ? bird.age.toString() : "N/A"}
                    className="mt-2 h-12"
                    readOnly
                  />
                </div>
                <div>
                  <Label>Pen Number</Label>
                  <Input
                    value={bird.penNumber || "N/A"}
                    className="mt-2 h-12"
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBirds.length === 0 && selectedLoft && (
        <div className="text-center py-8 text-gray-500">
          <p>
            No birds selected. Use the search box above to find and add birds.
          </p>
        </div>
      )}
    </div>
  );
}

function CountDown({ race }: { race: ListRaces }) {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    if (!race?.date) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const raceTime = new Date(race.date).getTime();
      const difference = raceTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });
      } else {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [race?.date]);

  return (
    <div className="grid grid-cols-4 gap-6 p-6 sm:p-8 lg:p-10">
      <div className="border-r px-10">
        <p className="text-2xl font-bold mb-4">{race._count.entries}</p>
        <p className="text-sm">Total Registrations</p>
      </div>
      <div className="border-r px-10">
        <p className="text-2xl font-bold mb-4">{timeRemaining.hours}</p>
        <p className="text-sm">Hours</p>
      </div>
      <div className="border-r px-10">
        <p className="text-2xl font-bold mb-4">{timeRemaining.minutes}</p>
        <p className="text-sm">Minutes</p>
      </div>
      <div className="px-10">
        <p className="text-2xl font-bold mb-4">{timeRemaining.seconds}</p>
        <p className="text-sm">Seconds</p>
      </div>
    </div>
  );
}

function PaymentInformation({
  race,
  selectedBirds,
}: {
  race: ListRaces;
  selectedBirds: LoftBird[];
}) {
  const totalAmount = race.entryFee * selectedBirds.length;

  const handlePayNow = () => {
    // TODO: Implement payment logic
    console.log("Processing payment for:", {
      raceId: race.id,
      birds: selectedBirds,
      totalAmount,
    });
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 w-full border-t bg-gray-50">
      <h2 className="font-bold text-secondary mb-6 text-2xl md:text-3xl lg:text-4xl">
        Payment Information
      </h2>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Entry Fee per Bird:</span>
            <span className="font-medium">${race.entryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Number of Birds:</span>
            <span className="font-medium">{selectedBirds.length}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b-2 border-secondary">
            <span className="text-lg font-semibold text-secondary">
              Total Amount:
            </span>
            <span className="text-xl font-bold text-secondary">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-3">Registered Birds:</h4>
          {selectedBirds.map((bird, index) => (
            <div
              key={bird.id}
              className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded"
            >
              <span className="text-sm">
                {index + 1}. {bird.name} - {bird.bandNumber}
              </span>
              <span className="text-sm font-medium text-green-600">
                ${race.entryFee.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex w-full justify-center">
          <PaypalButton raceId={race.id} selectedBirds={selectedBirds} />
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Secure payment processing • All payments are encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}

function PaypalButton({
  raceId,
  selectedBirds,
}: {
  raceId: string;
  selectedBirds: LoftBird[];
}) {
  const {
    mutateAsync: RegisterRaceMutateAsync,
    isPending: RegisterRacePending,
  } = registerRace({
    params: {},
    raceId,
  });
  const {
    mutateAsync: CapturePaymentMutateAsync,
    isPending: CapturePaymentPending,
  } = capturePayment({
    params: {},
  });
  const router = useRouter();
  const initalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  };
  async function onCreateOrder(): Promise<string> {
    if (!RegisterRaceMutateAsync) return "";
    const birdId: string[] = selectedBirds.map((bird) => bird.id);
    const { data, error } = await RegisterRaceMutateAsync({ birdId });
    const orderId: string = data?.data?.orderId;
    if (error) {
      // console.error("Error creating order:", error);
      toast.error(error);
      throw new Error("Failed to create order");
    }
    return orderId;
  }

  async function onApprove(data: any) {
    console.log(data)
    if (!data.orderID) {
      toast.error("Payment failed. Please try again.");
      return;
    }
    const { orderID } = data;
    try {
      if (!CapturePaymentMutateAsync) return;
      const { data, error } = await CapturePaymentMutateAsync({ orderID });
      if (error) {
        // console.error("Error capturing payment:", error);
        toast.error(error);
        return;
      }
      console.log("Payment captured successfully:", data);
      toast.success("Payment successful! Registration complete.");
    } catch (error) {
      // console.error("Error during payment capture:", error);
      toast.error("Payment failed. Please try again.");
    }
  }
  async function onError(error: any) {
    // console.error("PayPal Button Error:", error);
    // Handle error appropriately
    // toast.error("Payment failed. Please try again.");
  }

  return (
    <PayPalScriptProvider options={initalOptions}>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect" }}
        createOrder={onCreateOrder}
        onApprove={onApprove}
        onError={onError}
        fundingSource="paypal"
      />
    </PayPalScriptProvider>
  );
}
