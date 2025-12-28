"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle } from "lucide-react";
import type { Escrow } from "@/lib/web3/types";
import { useSelfVerification } from "@/contexts/self-verification-context";
import { SelfVerificationDialog } from "@/components/self/self-verification-dialog";

interface ApplicationDialogProps {
  job: Escrow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (job: Escrow, coverLetter: string, proposedTimeline: string) => void;
  applying: boolean;
}

export function ApplicationDialog({
  job,
  open,
  onOpenChange,
  onApply,
  applying,
}: ApplicationDialogProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedTimeline, setProposedTimeline] = useState("");
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const { isVerified } = useSelfVerification();

  const handleSubmit = () => {
    // Verification is required
    if (!isVerified) {
      setShowVerificationDialog(true);
      return;
    }

    if (job && coverLetter.trim() && proposedTimeline.trim()) {
      onApply(job, coverLetter, proposedTimeline);
      setCoverLetter("");
      setProposedTimeline("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Apply to {job?.projectDescription || `Job #${job?.id || "Unknown"}`}
          </DialogTitle>
          <DialogDescription>
            Submit your application for this freelance opportunity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!isVerified && (
            <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                <div className="font-semibold">Identity verification required</div>
                <div className="text-sm mt-1">
                  You must verify your identity to apply for jobs on SecureFlow.
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-red-200 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900"
                  onClick={() => setShowVerificationDialog(true)}
                >
                  <Shield className="w-3 h-3 mr-2" />
                  Verify Identity
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="coverLetter">Cover Letter *</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're the best fit for this job..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[120px]"
              required
              disabled={!isVerified}
            />
          </div>

          <div>
            <Label htmlFor="proposedTimeline">Proposed Timeline (days) *</Label>
            <Input
              id="proposedTimeline"
              type="number"
              placeholder="e.g., 7"
              value={proposedTimeline}
              onChange={(e) => setProposedTimeline(e.target.value)}
              min="1"
              required
              disabled={!isVerified}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              applying || !isVerified || !coverLetter.trim() || !proposedTimeline.trim()
            }
          >
            {applying ? "Applying..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>

      <SelfVerificationDialog
        open={showVerificationDialog}
        onOpenChange={setShowVerificationDialog}
        required={true}
      />
    </Dialog>
  );
}
