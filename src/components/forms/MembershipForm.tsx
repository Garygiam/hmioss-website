import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";

import { Button } from "@/components/ui/Button";
import type { MembershipPayload } from "@/lib/validation/membership";
import { membershipSchema } from "@/lib/validation/membership";

export function MembershipForm() {
  const { t } = useTranslation("common");
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<MembershipPayload>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      membershipType: "individual",
      fullName: "",
      email: "",
      phone: "",
      idNumber: "",
      reason: "",
    },
  });

  const onSubmit = async () => {
    setSubmitted(true);
    form.reset();
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#E0E0E0] bg-white p-10">
        <p className="font-heading text-2xl text-[#1A2A3A]">{t("forms.submitted")}</p>
        <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">{t("forms.success")}</p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="member-type">
          {t("forms.membershipType")}
        </label>
        <select
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="member-type"
          {...form.register("membershipType")}
        >
          <option value="individual">{t("forms.membershipTypes.individual")}</option>
          <option value="corporate">{t("forms.membershipTypes.corporate")}</option>
          <option value="lifetime">{t("forms.membershipTypes.lifetime")}</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="member-name">
          {t("forms.fullName")}
        </label>
        <input
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="member-name"
          {...form.register("fullName")}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="member-email">
          {t("forms.email")}
        </label>
        <input
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="member-email"
          type="email"
          {...form.register("email")}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="member-phone">
          {t("forms.phone")}
        </label>
        <input
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="member-phone"
          {...form.register("phone")}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="member-id">
          {t("forms.idNumber")}
        </label>
        <input
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="member-id"
          {...form.register("idNumber")}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="member-reason">
          {t("forms.reason")}
        </label>
        <textarea
          className="min-h-[140px] rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="member-reason"
          {...form.register("reason")}
        />
      </div>

      <Button type="submit" variant="primary">
        {t("forms.submit")}
      </Button>
    </form>
  );
}

