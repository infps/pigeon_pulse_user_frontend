"use client";

import { useGetEventParticipants } from "@/lib/api/event";
import { useGetParticipantBirds, usePlaceBet } from "@/lib/api/betting";
import { useCapturePayment } from "@/lib/api/payment";
import { EventParticipant, ParticipantBird } from "@/lib/types";
import { useAuthStore } from "@/store/store";
import { Users, Star, ChevronDown, ChevronUp, DollarSign } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface EventParticipantsProps {
  eventId: string;
}

interface BettingDialogState {
  isOpen: boolean;
  bird: ParticipantBird | null;
  bettingScheme: any;
}

export default function EventParticipants({
  eventId,
}: EventParticipantsProps) {
  const { data, isError, error, isPending } = useGetEventParticipants(eventId);
  const { user } = useAuthStore();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [bettingDialog, setBettingDialog] = useState<BettingDialogState>({
    isOpen: false,
    bird: null,
    bettingScheme: null,
  });
  const [betType, setBetType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const placeBetMutation = usePlaceBet();
  const capturePaymentMutation = useCapturePayment();

  const rawParticipants: EventParticipant[] = data?.data?.participants || [];
  
  // Sort participants to show logged-in user first
  const participants = useMemo(() => {
    if (!user?.idBreeder) return rawParticipants;
    
    const userParticipant = rawParticipants.find(
      (p) => p.idBreeder === user.idBreeder
    );
    const otherParticipants = rawParticipants.filter(
      (p) => p.idBreeder !== user.idBreeder
    );
    
    return userParticipant
      ? [userParticipant, ...otherParticipants]
      : rawParticipants;
  }, [rawParticipants, user?.idBreeder]);

  const toggleRow = (idEventInventory: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(idEventInventory)) {
      newExpandedRows.delete(idEventInventory);
    } else {
      newExpandedRows.add(idEventInventory);
    }
    setExpandedRows(newExpandedRows);
  };

  const handlePlaceBet = (bird: ParticipantBird, bettingScheme: any) => {
    setBettingDialog({
      isOpen: true,
      bird,
      bettingScheme,
    });
    setBetType("");
  };

  const getBetOptions = (bettingScheme: any, bird: ParticipantBird | null) => {
    const options: { value: string; label: string; amount: number }[] = [];
    
    if (!bird || !bird.currentBets) return options;
    
    // Only show options where the bird has opted in (value = 1)
    if (bettingScheme?.belgianShow1 && bettingScheme.belgianShow1 > 0 && bird.currentBets.belgianShow1 === 1) options.push({ value: "belgianShow1", label: "Belgian Show 1", amount: bettingScheme.belgianShow1 });
    if (bettingScheme?.belgianShow2 && bettingScheme.belgianShow2 > 0 && bird.currentBets.belgianShow2 === 1) options.push({ value: "belgianShow2", label: "Belgian Show 2", amount: bettingScheme.belgianShow2 });
    if (bettingScheme?.belgianShow3 && bettingScheme.belgianShow3 > 0 && bird.currentBets.belgianShow3 === 1) options.push({ value: "belgianShow3", label: "Belgian Show 3", amount: bettingScheme.belgianShow3 });
    if (bettingScheme?.belgianShow4 && bettingScheme.belgianShow4 > 0 && bird.currentBets.belgianShow4 === 1) options.push({ value: "belgianShow4", label: "Belgian Show 4", amount: bettingScheme.belgianShow4 });
    if (bettingScheme?.belgianShow5 && bettingScheme.belgianShow5 > 0 && bird.currentBets.belgianShow5 === 1) options.push({ value: "belgianShow5", label: "Belgian Show 5", amount: bettingScheme.belgianShow5 });
    if (bettingScheme?.belgianShow6 && bettingScheme.belgianShow6 > 0 && bird.currentBets.belgianShow6 === 1) options.push({ value: "belgianShow6", label: "Belgian Show 6", amount: bettingScheme.belgianShow6 });
    if (bettingScheme?.belgianShow7 && bettingScheme.belgianShow7 > 0 && bird.currentBets.belgianShow7 === 1) options.push({ value: "belgianShow7", label: "Belgian Show 7", amount: bettingScheme.belgianShow7 });
    if (bettingScheme?.standardShow1 && bettingScheme.standardShow1 > 0 && bird.currentBets.standardShow1 === 1) options.push({ value: "standardShow1", label: "Standard Show 1", amount: bettingScheme.standardShow1 });
    if (bettingScheme?.standardShow2 && bettingScheme.standardShow2 > 0 && bird.currentBets.standardShow2 === 1) options.push({ value: "standardShow2", label: "Standard Show 2", amount: bettingScheme.standardShow2 });
    if (bettingScheme?.standardShow3 && bettingScheme.standardShow3 > 0 && bird.currentBets.standardShow3 === 1) options.push({ value: "standardShow3", label: "Standard Show 3", amount: bettingScheme.standardShow3 });
    if (bettingScheme?.standardShow4 && bettingScheme.standardShow4 > 0 && bird.currentBets.standardShow4 === 1) options.push({ value: "standardShow4", label: "Standard Show 4", amount: bettingScheme.standardShow4 });
    if (bettingScheme?.standardShow5 && bettingScheme.standardShow5 > 0 && bird.currentBets.standardShow5 === 1) options.push({ value: "standardShow5", label: "Standard Show 5", amount: bettingScheme.standardShow5 });
    if (bettingScheme?.standardShow6 && bettingScheme.standardShow6 > 0 && bird.currentBets.standardShow6 === 1) options.push({ value: "standardShow6", label: "Standard Show 6", amount: bettingScheme.standardShow6 });
    if (bettingScheme?.wta1 && bettingScheme.wta1 > 0 && bird.currentBets.wtaBet1 === 1) options.push({ value: "wta1", label: "WTA 1", amount: bettingScheme.wta1 });
    if (bettingScheme?.wta2 && bettingScheme.wta2 > 0 && bird.currentBets.wtaBet2 === 1) options.push({ value: "wta2", label: "WTA 2", amount: bettingScheme.wta2 });
    if (bettingScheme?.wta3 && bettingScheme.wta3 > 0 && bird.currentBets.wtaBet3 === 1) options.push({ value: "wta3", label: "WTA 3", amount: bettingScheme.wta3 });
    if (bettingScheme?.wta4 && bettingScheme.wta4 > 0 && bird.currentBets.wtaBet4 === 1) options.push({ value: "wta4", label: "WTA 4", amount: bettingScheme.wta4 });
    if (bettingScheme?.wta5 && bettingScheme.wta5 > 0 && bird.currentBets.wtaBet5 === 1) options.push({ value: "wta5", label: "WTA 5", amount: bettingScheme.wta5 });
    
    return options;
  };

  const selectedBetOption = useMemo(() => {
    if (!betType || !bettingDialog.bettingScheme || !bettingDialog.bird) return null;
    return getBetOptions(bettingDialog.bettingScheme, bettingDialog.bird).find(
      opt => opt.value === betType
    );
  }, [betType, bettingDialog.bettingScheme, bettingDialog.bird]);

  const submitBet = async (): Promise<string> => {
    if (!bettingDialog.bird || !betType || !selectedBetOption) {
      throw new Error("Please select a bet type");
    }

    setIsProcessing(true);
    if(!placeBetMutation.mutateAsync)  return "";
    try {
      const result = await placeBetMutation.mutateAsync?.({
        idEventInventoryItem: bettingDialog.bird.idEventInventoryItem,
        betType,
        betAmount: selectedBetOption.amount,
      });
      console.log(result.data)
      const orderId = result?.data?.data?.orderId;
      if (!orderId) {
        throw new Error("No order ID received");
      }

      toast.info("Bet created successfully. Complete payment to confirm.");
      return orderId;
    } catch (err: any) {
      setIsProcessing(false);
      toast.error(err?.message || "Failed to create bet");
      throw err;
    }
  };

  const onApprove = async (data: any) => {
    try {
      if (!data.orderID) {
        throw new Error("No order ID provided by PayPal");
      }
      if(!capturePaymentMutation.mutateAsync)  return;
      toast.info("Processing payment...");

      const { error } = await capturePaymentMutation.mutateAsync({
        orderId: data.orderID,
      });

      if (error) {
        throw new Error("Payment capture failed: " + error);
      }

      toast.success("Bet placed and payment completed successfully!");
      
      setBettingDialog({ isOpen: false, bird: null, bettingScheme: null });
      setBetType("");
    } catch (error: any) {
      console.error("Error during payment capture:", error);
      toast.error(error.message || "Payment failed. Please contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (error: any) => {
    console.error("PayPal Button Error:", error);
    setIsProcessing(false);
    toast.error(error?.message || "Payment failed. Please try again.");
  };

  const onCancel = () => {
    setIsProcessing(false);
    toast.info("Payment cancelled");
  };

  // Component for expanded bird listing
  const ParticipantBirdsRow = ({ participant }: { participant: EventParticipant }) => {
    const { data: birdsData, isPending: birdsPending, isError: birdsError } = useGetParticipantBirds(
      eventId,
      participant.idBreeder
    );

    if (birdsPending) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-4">
            <div className="text-center text-gray-500">Loading birds...</div>
          </td>
        </tr>
      );
    }

    if (birdsError || !birdsData?.data) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-4">
            <div className="text-center text-red-500">Failed to load birds</div>
          </td>
        </tr>
      );
    }

    const { birds, bettingScheme } = birdsData.data;
    const isOwnBirds = user?.idBreeder === participant.idBreeder;

    if (birds.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-4">
            <div className="text-center text-gray-500">No birds registered</div>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td colSpan={4} className="px-0 py-0">
          <div className="bg-gray-50 px-6 py-4">
            <h4 className="font-semibold text-sm mb-3 text-gray-700">
              Birds ({birds.length})
            </h4>
            <div className="grid gap-3">
              {birds.map((bird: ParticipantBird) => (
                <div
                  key={bird.idEventInventoryItem}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                          {bird.birdNo || "?"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {bird.bird.birdName || "Unnamed"}
                          </div>
                          <div className="text-sm text-gray-600">
                            Band: {bird.bird.band || "N/A"} | Color:{" "}
                            {bird.bird.color || "N/A"} | Sex:{" "}
                            {bird.bird.sex === 1 ? "Male" : bird.bird.sex === 2 ? "Female" : "Unknown"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isOwnBirds && user?.idBreeder ? (
                        <Button
                          size="sm"
                          onClick={() => handlePlaceBet(bird, bettingScheme)}
                          className="gap-2"
                        >
                          <DollarSign className="w-4 h-4" />
                          Place Bet
                        </Button>
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          {isOwnBirds ? "Your bird" : "Login to bet"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  if (isPending) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="text-center py-8 text-gray-500">
            Loading participants...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="text-center py-8 text-red-500">
            Failed to load participants. {error?.message}
          </div>
        </div>
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No participants yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Be the first to register for this event!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Registered Participants
          </h2>
          <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
            {participants.length} {participants.length === 1 ? "Breeder" : "Breeders"}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Breeder Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Loft Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Birds
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {participants.map((participant, index) => {
                  const isCurrentUser = user?.idBreeder === participant.idBreeder;
                  const isExpanded = expandedRows.has(participant.idEventInventory);
                  
                  return (
                    <>
                      <tr
                        key={participant.idEventInventory}
                        className={`transition-colors ${
                          isCurrentUser
                            ? "bg-primary/5 hover:bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                            isCurrentUser
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary"
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-900">
                              {participant.breederName}
                            </div>
                            {isCurrentUser && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white">
                                <Star className="w-3 h-3" fill="currentColor" />
                                You
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {participant.loft || "-"}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                              {participant.reservedBirds}
                            </span>
                            <button
                              onClick={() => toggleRow(participant.idEventInventory)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              aria-label={isExpanded ? "Collapse" : "Expand"}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-gray-600" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && <ParticipantBirdsRow participant={participant} />}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Betting Dialog */}
      <Dialog open={bettingDialog.isOpen} onOpenChange={(open) => {
        if (!open) {
          setBettingDialog({ isOpen: false, bird: null, bettingScheme: null });
          setBetType("");
          setIsProcessing(false);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Place Bet</DialogTitle>
            <DialogDescription>
              Place a bet on {bettingDialog.bird?.bird.birdName || "this bird"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bet-type">Bet Type</Label>
              <Select value={betType} onValueChange={setBetType}>
                <SelectTrigger id="bet-type">
                  <SelectValue placeholder="Select bet type" />
                </SelectTrigger>
                <SelectContent>
                  {getBetOptions(bettingDialog.bettingScheme, bettingDialog.bird).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} - ${option.amount.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedBetOption && (
                <p className="text-sm text-gray-600 mt-2 font-medium">
                  Bet Amount: ${selectedBetOption.amount.toFixed(2)}
                </p>
              )}
            </div>

            {betType && selectedBetOption && (
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-4">
                  Click the PayPal button below to complete your bet:
                </p>
                {isProcessing && (
                  <div className="mb-4 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600 mr-2"></div>
                      Processing...
                    </div>
                  </div>
                )}
                <PayPalScriptProvider options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                  currency: "USD",
                  intent: "capture",
                }}>
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      height: 45,
                    }}
                    createOrder={submitBet}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                    fundingSource="paypal"
                    disabled={isProcessing}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>
          {!betType && (
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setBettingDialog({ isOpen: false, bird: null, bettingScheme: null });
                  setBetType("");
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
