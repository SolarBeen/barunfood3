import { lazy, Suspense } from "react";
import type { InquiryType } from "./InquiryDialog";

const InquiryDialog = lazy(() => import("./InquiryDialog").then(module => ({ default: module.InquiryDialog })));

type LazyInquiryDialogProps = { open: boolean; onClose: () => void; defaultInquiryType?: InquiryType };

export function LazyInquiryDialog({ open, onClose, defaultInquiryType }: LazyInquiryDialogProps) {
  if (!open) return null;
  return <Suspense fallback={null}><InquiryDialog open={open} onClose={onClose} defaultInquiryType={defaultInquiryType} /></Suspense>;
}
