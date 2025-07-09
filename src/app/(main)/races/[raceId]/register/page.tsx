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
import { useSession } from "@/lib/auth-client";

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
  const { data: sessionData, error: sessionError, isPending: sessionPending } = useSession();
  const { userData } = useUserStore();
  
  // Authentication check
  useEffect(() => {
    if (!sessionPending && !sessionData?.user) {
      toast.error("Please log in to register for races");
      router.push("/login");
      return;
    }
  }, [sessionData, sessionPending, router]);

  const { data, error, isError, isPending, isSuccess } = getRace({
    params: {},
    raceId,
  });
  
  const [selectedLoft, setSelectedLoft] = useState<MyLofts | null>(null);
  const [selectedBirds, setSelectedBirds] = useState<LoftBird[]>([]);

  // Loading state for authentication
  if (sessionPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-lg text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Authentication error
  if (sessionError || !sessionData?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-red-500">🔒</h1>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Authentication Required
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              You need to be logged in to register for races.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => router.push("/login")} className="w-full sm:w-auto">
              Log In
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/races")}
              className="w-full sm:w-auto"
            >
              Back to Races
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state for race data
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-lg text-muted-foreground">Loading race details...</p>
        </div>
      </div>
    );
  }

  // Error state for race data
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-red-500">❌</h1>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Race Not Found
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {error?.message || "The race you're looking for doesn't exist or has been removed."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/races")}
              className="w-full sm:w-auto"
            >
              Back to Races
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No race data
  if (isSuccess && !data?.data) {
    router.push("/races");
    return null;
  }

  const race: ListRaces = data?.data;

  // Race status check
  if (race.status !== "UPCOMING") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-yellow-500">⏰</h1>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Registration Closed
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              The registration for "{race.name}" is no longer available.
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Status: {race.status}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.push("/races")}
              className="w-full sm:w-auto"
            >
              Browse Other Races
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/races/${race.id}`)}
              className="w-full sm:w-auto"
            >
              View Race Details
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-4 sm:px-6 lg:px-10 sm:h-64 lg:h-96 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-semibold tracking-wider uppercase leading-tight">
            Chasing the sky one feather at a time
          </h1>
        </div>
      </div>
      <CountDown race={race} />
      <div className="bg-gradient-to-r from-primary to-white text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 py-4 text-white px-4">
          {race.name}
        </h1>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full border-b">
      <h2 className="font-bold text-secondary mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Race Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium">Race Name</Label>
          <Input value={race.name} className="mt-2 h-10 sm:h-12" readOnly />
        </div>
        <div>
          <Label className="text-sm font-medium">Race Distance</Label>
          <Input
            value={`${race.distanceKm} km`}
            className="mt-2 h-10 sm:h-12"
            readOnly
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <Label className="text-sm font-medium">Race Date</Label>
          <Input
            value={new Date(race.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            className="mt-2 h-10 sm:h-12"
            readOnly
          />
        </div>
        <div>
          <Label className="text-sm font-medium">From Location</Label>
          <Input value={race.startLocation} className="mt-2 h-10 sm:h-12" readOnly />
        </div>
        <div>
          <Label className="text-sm font-medium">To Location</Label>
          <Input value={race.endLocation} className="mt-2 h-10 sm:h-12" readOnly />
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

  const { data, isError, isPending, isSuccess, error } = listMyLofts({
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

  // Error handling for lofts
  if (isError && error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full border-b">
        <h2 className="font-bold text-secondary mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Owner Information
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">
            Error loading lofts: {error.message}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full border-b">
      <h2 className="font-bold text-secondary mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Owner Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <div>
          <Label className="text-sm font-medium">Name</Label>
          <Input value={userData?.user?.name || ""} className="mt-2 h-10 sm:h-12" readOnly />
        </div>
        <div>
          <Label className="text-sm font-medium">Email</Label>
          <Input value={userData?.user?.email || ""} className="mt-2 h-10 sm:h-12" readOnly />
        </div>
        <div>
          <Label className="text-sm font-medium">Loft Name</Label>
          <ComboBox
            className="mt-2 h-10 sm:h-12"
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
            placeholder="Select a loft..."
          />
          {isError && (
            <p className="text-red-500 text-xs mt-1">Failed to load lofts</p>
          )}
        </div>
        <div>
          <Label className="text-sm font-medium">Loft Id</Label>
          <Input
            value={selectedLoft ? selectedLoft.loftId : ""}
            className="mt-2 h-10 sm:h-12"
            readOnly
            placeholder="Select a loft first"
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
      toast.success(`${bird.name} added to registration`);
    } else {
      toast.info(`${bird.name} is already selected`);
    }
  };

  const handleRemoveBird = (birdId: string) => {
    const bird = selectedBirds.find(b => b.id === birdId);
    setSelectedBirds(selectedBirds.filter((bird) => bird.id !== birdId));
    if (bird) {
      toast.success(`${bird.name} removed from registration`);
    }
  };

  // Error handling for birds
  if (isError && error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full">
        <h2 className="font-bold text-secondary mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Bird Information
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">
            Error loading birds: {error.message}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full">
      <h2 className="font-bold text-secondary mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Bird Information
      </h2>

      <div className="mb-6">
        <Label className="text-sm font-medium">Search and Add Birds</Label>
        <ComboBox
          className="mt-2 h-10 sm:h-12"
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
        {isError && (
          <p className="text-red-500 text-xs mt-1">Failed to load birds</p>
        )}
        {isSuccess && birds.length === 0 && !isPending && (
          <p className="text-gray-500 text-xs mt-1">No birds found in this loft</p>
        )}
      </div>

      {selectedBirds.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Selected Birds ({selectedBirds.length})</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedBirds([]);
                toast.success("All birds removed from registration");
              }}
            >
              Clear All
            </Button>
          </div>
          {selectedBirds.map((bird, index) => (
            <div key={bird.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h4 className="font-medium text-base sm:text-lg">Bird #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveBird(bird.id)}
                  className="self-start sm:self-auto"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-medium text-gray-600">Bird Name</Label>
                  <Input value={bird.name} className="mt-1 h-10" readOnly />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Band Number</Label>
                  <Input
                    value={bird.bandNumber}
                    className="mt-1 h-10"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Breed</Label>
                  <Input
                    value={bird.breed || "N/A"}
                    className="mt-1 h-10"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Color</Label>
                  <Input
                    value={bird.color || "N/A"}
                    className="mt-1 h-10"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Age</Label>
                  <Input
                    value={bird.age ? bird.age.toString() : "N/A"}
                    className="mt-1 h-10"
                    readOnly
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">Pen Number</Label>
                  <Input
                    value={bird.penNumber || "N/A"}
                    className="mt-1 h-10"
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
          <div className="max-w-md mx-auto">
            <p className="text-sm sm:text-base">
              No birds selected. Use the search box above to find and add birds from your loft.
            </p>
            {isSuccess && birds.length === 0 && (
              <p className="text-xs mt-2 text-red-500">
                This loft has no birds. Please add birds to your loft first.
              </p>
            )}
          </div>
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 lg:p-8 xl:p-10">
      <div className="border-r px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">{race._count.entries}</p>
        <p className="text-xs sm:text-sm text-gray-600">Total Registrations</p>
      </div>
      <div className="border-r px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">{timeRemaining.hours}</p>
        <p className="text-xs sm:text-sm text-gray-600">Hours</p>
      </div>
      <div className="border-r px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">{timeRemaining.minutes}</p>
        <p className="text-xs sm:text-sm text-gray-600">Minutes</p>
      </div>
      <div className="px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">{timeRemaining.seconds}</p>
        <p className="text-xs sm:text-sm text-gray-600">Seconds</p>
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full border-t bg-gray-50">
      <h2 className="font-bold text-secondary mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Payment Information
      </h2>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 text-sm sm:text-base">Entry Fee per Bird:</span>
            <span className="font-medium text-sm sm:text-base">${race.entryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 text-sm sm:text-base">Number of Birds:</span>
            <span className="font-medium text-sm sm:text-base">{selectedBirds.length}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b-2 border-secondary">
            <span className="text-base sm:text-lg font-semibold text-secondary">
              Total Amount:
            </span>
            <span className="text-lg sm:text-xl font-bold text-secondary">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">Registered Birds:</h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {selectedBirds.map((bird, index) => (
              <div
                key={bird.id}
                className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded text-sm"
              >
                <span className="flex-1 truncate">
                  {index + 1}. {bird.name} - {bird.bandNumber}
                </span>
                <span className="font-medium text-green-600 ml-2">
                  ${race.entryFee.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex w-full justify-center">
          <div className="w-full max-w-md">
            <PaypalButton raceId={race.id} selectedBirds={selectedBirds} />
          </div>
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
  const [isProcessing, setIsProcessing] = useState(false);
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
  
  // Validate PayPal client ID
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    return (
      <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">Payment system is temporarily unavailable</p>
      </div>
    );
  }

  const initialOptions = {
    clientId,
    currency: "USD",
    intent: "capture",
  };

  async function onCreateOrder(): Promise<string> {
    try {
      setIsProcessing(true);
      
      if (!RegisterRaceMutateAsync) {
        throw new Error("Registration service unavailable");
      }
      
      if (selectedBirds.length === 0) {
        throw new Error("No birds selected for registration");
      }

      const birdId: string[] = selectedBirds.map((bird) => bird.id);
      const { data, error } = await RegisterRaceMutateAsync({ birdId });
      
      if (error) {
        toast.error(error);
        throw new Error("Failed to create order: " + error);
      }
      
      const orderId: string = data?.data?.orderId;
      if (!orderId) {
        throw new Error("No order ID received");
      }
      
      toast.info("Order created successfully");
      return orderId;
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(error.message || "Failed to create order");
      setIsProcessing(false);
      throw error;
    }
  }

  async function onApprove(data: any) {
    try {
      console.log("PayPal approval data:", data);
      
      if (!data.orderID) {
        throw new Error("No order ID provided by PayPal");
      }

      const { orderID } = data;
      toast.info("Processing payment...");

      if (!CapturePaymentMutateAsync) {
        throw new Error("Payment capture service unavailable");
      }

      const { data: captureData, error } = await CapturePaymentMutateAsync({ orderID });
      
      if (error) {
        console.error("Error capturing payment:", error);
        // toast.error(error);
        throw new Error("Payment capture failed: " + error);
      }

      console.log("Payment captured successfully:", captureData);
      toast.success("Payment successful! Registration complete.");
      
      // Successful payment - redirect to appropriate page
      setTimeout(() => {
        router.push(`/profile/my-races`);
      }, 2000);
      
    } catch (error: any) {
      console.error("Error during payment capture:", error);
      // toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function onError(error: any) {
    console.error("PayPal Button Error:", error);
    setIsProcessing(false);
    
    let errorMessage = "Payment failed. Please try again.";
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    toast.error(errorMessage);
  }

  function onCancel(data: any) {
    console.log("PayPal payment cancelled:", data);
    setIsProcessing(false);
    toast.info("Payment cancelled");
  }

  const isDisabled = isProcessing || RegisterRacePending || CapturePaymentPending;

  return (
    <div className="w-full">
      {isDisabled && (
        <div className="mb-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600 mr-2"></div>
            {RegisterRacePending ? "Creating order..." : 
             CapturePaymentPending ? "Processing payment..." : 
             "Processing..."}
          </div>
        </div>
      )}
      
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ 
            layout: "vertical", 
            color: "blue", 
            shape: "rect",
            height: 45
          }}
          createOrder={onCreateOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
          fundingSource="paypal"
          disabled={isDisabled}
        />
      </PayPalScriptProvider>
      
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          You will be redirected to your race registrations after successful payment
        </p>
      </div>
    </div>
  );
}
