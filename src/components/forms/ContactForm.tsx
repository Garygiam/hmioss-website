import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";

import { Button } from "@/components/ui/Button";
import type { ContactPayload } from "@/lib/validation/contact";
import { contactSchema } from "@/lib/validation/contact";

export function ContactForm() {
  const { t } = useTranslation("common");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactPayload) => {
    setStatus("idle");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("error");
  };

  return (
    <form
      className="grid gap-5"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="contact-name">
          {t("forms.name")}
        </label>
        <input
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="contact-name"
          {...form.register("name")}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="contact-email">
          {t("forms.email")}
        </label>
        <input
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="contact-email"
          type="email"
          {...form.register("email")}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="contact-subject">
          {t("forms.subject")}
        </label>
        <input
          className="h-11 rounded-xl border border-[#E0E0E0] bg-white px-4 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="contact-subject"
          {...form.register("subject")}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[#1A2A3A]" htmlFor="contact-message">
          {t("forms.message")}
        </label>
        <textarea
          className="min-h-[140px] rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#D4AF37] focus:outline-hidden"
          id="contact-message"
          {...form.register("message")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary">
          {form.formState.isSubmitting ? t("forms.sending") : t("forms.submit")}
        </Button>
        {status === "success" ? (
          <p className="text-sm font-semibold text-[#1A2A3A]">{t("forms.success")}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm font-semibold text-[#C41E3A]">{t("forms.error")}</p>
        ) : null}
      </div>
    </form>
  );
}

