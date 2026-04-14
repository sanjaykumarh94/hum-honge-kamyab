import { f as useAuthStore, u as useRouter, r as reactExports, j as jsxRuntimeExports, a as Button, d as Briefcase, e as Building2, M as MapPin, S as Separator } from "./index-BFdoklgf.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CIs8rJlK.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { L as Label } from "./label-CtntKOhe.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BdpOzEfG.js";
import { T as Textarea } from "./textarea-DMonJcHX.js";
import { u as ue } from "./index-t444bNAk.js";
import { J as useCreateJob } from "./useBackend-Dhw_nMAY.js";
import { A as ArrowLeft } from "./arrow-left-CAScpI3V.js";
import { L as LoaderCircle } from "./loader-circle-BuFLBBTd.js";
import "./index-q7D4Kz4T.js";
import "./index-BaLXypA6.js";
import "./index-CG7nvONz.js";
const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship"];
const JOB_CATEGORIES = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
  "Sales",
  "HR",
  "Engineering",
  "Manufacturing",
  "Education",
  "Healthcare",
  "Other"
];
const INDIA_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal"
];
const INIT = {
  title: "",
  description: "",
  requirements: "",
  education: "",
  jobType: "Full-Time",
  category: "",
  companyName: "",
  companyEmail: "",
  companyWebsite: "",
  country: "India",
  state: "",
  city: "",
  zipCode: "",
  address: ""
};
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: error ? "text-destructive" : "", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
function EmployerPostJob() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { mutateAsync: createJob, isPending } = useCreateJob();
  const [form, setForm] = reactExports.useState(INIT);
  const [errors, setErrors] = reactExports.useState({});
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const setSelect = (k) => (v) => setForm((p) => ({ ...p, [k]: v }));
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.jobType) errs.jobType = "Job type is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.companyEmail.trim())
      errs.companyEmail = "Contact email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail))
      errs.companyEmail = "Invalid email format";
    if (!form.city.trim()) errs.city = "City is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      ue.error("Not authenticated");
      return;
    }
    if (!validate()) {
      ue.error("Please fix the errors below");
      return;
    }
    const location = [form.city, form.state, form.country].filter(Boolean).join(", ");
    await createJob({
      employerId: user.id,
      title: form.title,
      description: form.description,
      requirements: form.requirements,
      education: form.education,
      location,
      jobType: form.jobType,
      category: form.category,
      companyName: form.companyName,
      companyEmail: form.companyEmail,
      companyWebsite: form.companyWebsite || null
    });
    ue.success("Job posted successfully!");
    router.navigate({ to: "/employer" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", "data-ocid": "employer-post-job", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "h-8 w-8 p-0",
          onClick: () => router.navigate({ to: "/employer" }),
          "aria-label": "Back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Post a Job" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Create a new job listing for candidates" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 15, className: "text-primary" }),
          " Job Information"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Job Title *", error: errors.title, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.title,
                onChange: set("title"),
                placeholder: "e.g. Front-End Developer",
                "data-ocid": "job-title"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Job Type *", error: errors.jobType, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.jobType,
                onValueChange: setSelect("jobType"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "job-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: JOB_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category *", error: errors.category, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.category,
              onValueChange: setSelect("category"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "job-category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: JOB_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description *", error: errors.description, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.description,
              onChange: set("description"),
              rows: 5,
              placeholder: "Describe the role, responsibilities, and what you're looking for...",
              "data-ocid": "job-description"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Requirements", error: errors.requirements, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.requirements,
              onChange: set("requirements"),
              rows: 4,
              placeholder: "List required skills, experience, and qualifications...",
              "data-ocid": "job-requirements"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Education Requirements", error: errors.education, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.education,
              onChange: set("education"),
              rows: 2,
              placeholder: "e.g. Bachelor's degree in Computer Science or related field",
              "data-ocid": "job-education"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 15, className: "text-primary" }),
          " Company Information"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company Name *", error: errors.companyName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.companyName,
                onChange: set("companyName"),
                placeholder: "e.g. Shree Cement Ltd.",
                "data-ocid": "company-name"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contact Email *", error: errors.companyEmail, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "email",
                value: form.companyEmail,
                onChange: set("companyEmail"),
                placeholder: "hr@company.com",
                "data-ocid": "company-email"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company Website", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.companyWebsite,
              onChange: set("companyWebsite"),
              placeholder: "https://www.company.com",
              "data-ocid": "company-website"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-primary" }),
          " Location"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.country,
                onValueChange: setSelect("country"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "job-country", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "India", children: "India" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Other", children: "Other" })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "State", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.state, onValueChange: setSelect("state"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "job-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select state" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDIA_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City *", error: errors.city, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.city,
                onChange: set("city"),
                placeholder: "e.g. Raipur",
                "data-ocid": "job-city"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Zip Code", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.zipCode,
                onChange: set("zipCode"),
                placeholder: "492001",
                "data-ocid": "job-zipcode"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Address", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.address,
              onChange: set("address"),
              placeholder: "Street address...",
              "data-ocid": "job-address"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "btn-primary",
            disabled: isPending,
            "data-ocid": "post-job-submit",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
              "Posting..."
            ] }) : "Post Job"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => router.navigate({ to: "/employer" }),
            disabled: isPending,
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] });
}
export {
  EmployerPostJob as default
};
