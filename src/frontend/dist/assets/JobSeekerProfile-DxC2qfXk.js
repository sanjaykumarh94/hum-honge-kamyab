import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, t as useComposedRefs, h as cn, f as useAuthStore, n as User, M as MapPin, d as Briefcase, b as BookOpen, S as Separator, a as Button, B as Badge, G as GraduationCap } from "./index-BESvdAtP.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BILcuGgo.js";
import { P as Primitive, u as useControllableState, c as composeEventHandlers, a as createContextScope } from "./index-DHKM-vaf.js";
import { u as usePrevious, e as useSize, C as Check, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bb1Qu6H-.js";
import { P as Presence } from "./index-C0RboPBm.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-De3pM8re.js";
import { I as Input } from "./input-BzQTN1iz.js";
import { L as Label } from "./label-PjA3JIae.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BWRNkXzI.js";
import { T as Textarea } from "./textarea-C0z7fU2h.js";
import { u as ue } from "./index-B6STimMY.js";
import { t as useGetJobSeekerProfile, v as useGetExperiences, w as useGetEducations, n as useUpdateUser, x as useUpsertJobSeekerProfile, y as useAddExperience, z as useDeleteExperience, A as useAddEducation, B as useDeleteEducation } from "./useBackend-DY9BrSjM.js";
import { F as FileText } from "./file-text-DAZ1hwNK.js";
import { L as LoaderCircle } from "./loader-circle-CAw1V18h.js";
import { P as Plus } from "./plus-NrIWEBjb.js";
import { T as Trash2 } from "./trash-2-DcO_V06Z.js";
import "./index-2V6FtwJL.js";
import "./index-BWNgSiJ4.js";
import "./index-2uff8Ysi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];
function fmtDate(ts) {
  if (!ts) return "";
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric"
  });
}
const BLANK_EXP = {
  company: "",
  title: "",
  desc: "",
  start: "",
  end: "",
  isCurrent: false
};
function ExperienceDialog({
  open,
  onClose,
  initial,
  onSave,
  isSaving
}) {
  const [f, setF] = reactExports.useState(initial ?? BLANK_EXP);
  const upd = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: initial ? "Edit Experience" : "Add Experience" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Company Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: f.company,
              onChange: upd("company"),
              "data-ocid": "exp-company"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: f.title,
              onChange: upd("title"),
              "data-ocid": "exp-title"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: f.start,
              onChange: upd("start"),
              "data-ocid": "exp-start"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "End Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: f.end,
              onChange: upd("end"),
              disabled: f.isCurrent,
              "data-ocid": "exp-end"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: "exp-current",
            checked: f.isCurrent,
            onCheckedChange: (v) => setF((p) => ({ ...p, isCurrent: !!v, end: v ? "" : p.end })),
            "data-ocid": "exp-current"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exp-current", className: "text-sm cursor-pointer", children: "This is my current position" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: f.desc,
            onChange: upd("desc"),
            rows: 3,
            "data-ocid": "exp-desc"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          disabled: isSaving,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "btn-primary",
          disabled: isSaving || !f.company || !f.title || !f.start,
          onClick: () => onSave(f),
          "data-ocid": "exp-save",
          children: [
            isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }) : null,
            "Save"
          ]
        }
      )
    ] })
  ] }) });
}
const BLANK_EDU = {
  institution: "",
  degree: "",
  desc: "",
  start: "",
  end: ""
};
function EducationDialog({
  open,
  onClose,
  initial,
  onSave,
  isSaving
}) {
  const [f, setF] = reactExports.useState(initial ?? BLANK_EDU);
  const upd = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: initial ? "Edit Education" : "Add Education" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Institution *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: f.institution,
              onChange: upd("institution"),
              "data-ocid": "edu-institution"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Degree *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: f.degree,
              onChange: upd("degree"),
              "data-ocid": "edu-degree"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: f.start,
              onChange: upd("start"),
              "data-ocid": "edu-start"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "End Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: f.end,
              onChange: upd("end"),
              "data-ocid": "edu-end"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: f.desc,
            onChange: upd("desc"),
            rows: 3,
            "data-ocid": "edu-desc"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          disabled: isSaving,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "btn-primary",
          disabled: isSaving || !f.institution || !f.degree || !f.start,
          onClick: () => onSave(f),
          "data-ocid": "edu-save",
          children: [
            isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }) : null,
            "Save"
          ]
        }
      )
    ] })
  ] }) });
}
function ExpEntry({
  exp,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-3 bg-muted/20 rounded-md border border-border/50",
      "data-ocid": `exp-entry-${exp.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: exp.positionTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: exp.companyName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            fmtDate(exp.startDate),
            " —",
            " ",
            exp.isCurrent ? "Present" : fmtDate(exp.endDate)
          ] }),
          exp.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: exp.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10",
            onClick: onDelete,
            "aria-label": "Delete experience",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
          }
        ) })
      ]
    }
  );
}
function EduEntry({ edu, onDelete }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start gap-3 p-3 bg-muted/20 rounded-md border border-border/50",
      "data-ocid": `edu-entry-${edu.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 14, className: "text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: edu.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: edu.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            fmtDate(edu.startDate),
            " — ",
            fmtDate(edu.endDate)
          ] }),
          edu.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: edu.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 text-destructive hover:bg-destructive/10 shrink-0",
            onClick: onDelete,
            "aria-label": "Delete education",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
          }
        )
      ]
    }
  );
}
function JobSeekerProfile() {
  const { user, updateUser: storeUpdate } = useAuthStore();
  const { data: profile } = useGetJobSeekerProfile((user == null ? void 0 : user.id) ?? "");
  const { data: experiences } = useGetExperiences((user == null ? void 0 : user.id) ?? "");
  const { data: educations } = useGetEducations((user == null ? void 0 : user.id) ?? "");
  const { mutateAsync: updateUser, isPending: isSavingUser } = useUpdateUser();
  const { mutateAsync: upsertProfile, isPending: isSavingProfile } = useUpsertJobSeekerProfile();
  const { mutateAsync: addExp, isPending: isAddingExp } = useAddExperience();
  const { mutateAsync: deleteExp } = useDeleteExperience();
  const { mutateAsync: addEdu, isPending: isAddingEdu } = useAddEducation();
  const { mutateAsync: deleteEdu } = useDeleteEducation();
  const [firstName, setFirstName] = reactExports.useState((user == null ? void 0 : user.firstName) ?? "");
  const [lastName, setLastName] = reactExports.useState((user == null ? void 0 : user.lastName) ?? "");
  const [phone, setPhone] = reactExports.useState((user == null ? void 0 : user.phone) ?? "");
  const [resumeFile, setResumeFile] = reactExports.useState(
    (profile == null ? void 0 : profile.resumeUrl) ?? ""
  );
  const [country, setCountry] = reactExports.useState((profile == null ? void 0 : profile.country) ?? "India");
  const [state, setState] = reactExports.useState((profile == null ? void 0 : profile.state) ?? "");
  const [city, setCity] = reactExports.useState((profile == null ? void 0 : profile.city) ?? "");
  const [zipCode, setZipCode] = reactExports.useState((profile == null ? void 0 : profile.zipCode) ?? "");
  const [address, setAddress] = reactExports.useState((profile == null ? void 0 : profile.address) ?? "");
  const [expDialogOpen, setExpDialogOpen] = reactExports.useState(false);
  const [eduDialogOpen, setEduDialogOpen] = reactExports.useState(false);
  const isSaving = isSavingUser || isSavingProfile;
  const handleSaveAccount = async (e) => {
    e.preventDefault();
    if (!user) return;
    const res = await updateUser({
      id: user.id,
      firstName,
      lastName,
      phone: phone || null
    });
    if (res.__kind__ === "ok") {
      storeUpdate(res.ok);
      ue.success("Account details saved!");
    } else ue.error(res.err ?? "Failed to save");
  };
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!user) return;
    await upsertProfile({
      userId: user.id,
      profile: {
        userId: user.id,
        country,
        state,
        city,
        zipCode,
        address,
        createdAt: (profile == null ? void 0 : profile.createdAt) ?? BigInt(Date.now()),
        resumeUrl: resumeFile || (profile == null ? void 0 : profile.resumeUrl)
      }
    });
    ue.success("Address saved!");
  };
  const handleAddExp = async (f) => {
    if (!user) return;
    await addExp({
      userId: user.id,
      companyName: f.company,
      positionTitle: f.title,
      description: f.desc || null,
      startDate: BigInt(new Date(f.start).getTime()),
      endDate: f.end && !f.isCurrent ? BigInt(new Date(f.end).getTime()) : null,
      isCurrent: f.isCurrent
    });
    setExpDialogOpen(false);
    ue.success("Experience added!");
  };
  const handleAddEdu = async (f) => {
    if (!user) return;
    await addEdu({
      userId: user.id,
      institution: f.institution,
      degree: f.degree,
      description: f.desc || null,
      startDate: BigInt(new Date(f.start).getTime()),
      endDate: f.end ? BigInt(new Date(f.end).getTime()) : null
    });
    setEduDialogOpen(false);
    ue.success("Education added!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", "data-ocid": "jobseeker-profile", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: user ? `${user.firstName} ${user.lastName}` : "My Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: user == null ? void 0 : user.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "account", "data-ocid": "profile-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-4 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "account",
            className: "flex items-center gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 13 }),
              " Account"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "address",
            className: "flex items-center gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
              " Address"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "experience",
            className: "flex items-center gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 13 }),
              " Experience"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "education",
            className: "flex items-center gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 13 }),
              " Education"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "account", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "text-primary" }),
          " Account Details"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveAccount, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "First Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: firstName,
                  onChange: (e) => setFirstName(e.target.value),
                  "data-ocid": "js-firstname"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Last Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: lastName,
                  onChange: (e) => setLastName(e.target.value),
                  "data-ocid": "js-lastname"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: (user == null ? void 0 : user.email) ?? "",
                disabled: true,
                className: "bg-muted text-muted-foreground",
                readOnly: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "+91 9800000000",
                "data-ocid": "js-phone"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14, className: "text-primary" }),
              " Resume"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 p-3 border border-dashed border-border rounded-md bg-muted/20", children: resumeFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16, className: "text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: resumeFile }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "h-6 px-2 text-xs text-muted-foreground ml-auto",
                  onClick: () => setResumeFile(""),
                  children: "Remove"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-center gap-2 cursor-pointer",
                htmlFor: "resume-upload",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Upload Resume (PDF, DOC)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "resume-upload",
                      type: "file",
                      accept: ".pdf,.doc,.docx",
                      className: "sr-only",
                      "data-ocid": "js-resume-upload",
                      onChange: (e) => {
                        var _a;
                        const file = (_a = e.target.files) == null ? void 0 : _a[0];
                        if (file) setResumeFile(file.name);
                      }
                    }
                  )
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "btn-primary",
                disabled: isSaving,
                "data-ocid": "js-save-account",
                children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }),
                  "Saving..."
                ] }) : "Save Changes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => {
                  setFirstName((user == null ? void 0 : user.firstName) ?? "");
                  setLastName((user == null ? void 0 : user.lastName) ?? "");
                  setPhone((user == null ? void 0 : user.phone) ?? "");
                },
                children: "Cancel"
              }
            )
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "address", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-primary" }),
          " Address Details"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveAddress, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: country, onValueChange: setCountry, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "js-country", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "India", children: "India" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Other", children: "Other" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: state, onValueChange: setState, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "js-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select state" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INDIA_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: city,
                  onChange: (e) => setCity(e.target.value),
                  placeholder: "e.g. Raipur",
                  "data-ocid": "js-city"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Zip Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: zipCode,
                  onChange: (e) => setZipCode(e.target.value),
                  placeholder: "492001",
                  "data-ocid": "js-zipcode"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: address,
                onChange: (e) => setAddress(e.target.value),
                rows: 3,
                placeholder: "Street address...",
                "data-ocid": "js-address"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "btn-primary",
                disabled: isSavingProfile,
                "data-ocid": "js-save-address",
                children: isSavingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-1" }),
                  "Saving..."
                ] }) : "Save Changes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", children: "Cancel" })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "experience", className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 16, className: "text-primary" }),
              " Work Experience"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                (experiences ?? []).length,
                " entries"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "btn-primary h-8 gap-1.5 text-xs",
                  onClick: () => setExpDialogOpen(true),
                  "data-ocid": "add-experience-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                    " Add Experience"
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: (experiences ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 32, className: "mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No experience added yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: 'Click "Add Experience" to get started' }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "mt-4 gap-1.5",
                onClick: () => setExpDialogOpen(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                  " Add First Experience"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (experiences ?? []).map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ExpEntry,
            {
              exp,
              onDelete: () => user && deleteExp({ id: exp.id, userId: user.id })
            },
            exp.id
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExperienceDialog,
          {
            open: expDialogOpen,
            onClose: () => setExpDialogOpen(false),
            onSave: handleAddExp,
            isSaving: isAddingExp
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "education", className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 16, className: "text-primary" }),
              " Education"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                (educations ?? []).length,
                " entries"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "btn-primary h-8 gap-1.5 text-xs",
                  onClick: () => setEduDialogOpen(true),
                  "data-ocid": "add-education-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                    " Add Education"
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: (educations ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GraduationCap,
              {
                size: 32,
                className: "mx-auto mb-3 opacity-30"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No education added yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: 'Click "Add Education" to get started' }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "mt-4 gap-1.5",
                onClick: () => setEduDialogOpen(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                  " Add First Education"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (educations ?? []).map((edu) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EduEntry,
            {
              edu,
              onDelete: () => user && deleteEdu({ id: edu.id, userId: user.id })
            },
            edu.id
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EducationDialog,
          {
            open: eduDialogOpen,
            onClose: () => setEduDialogOpen(false),
            onSave: handleAddEdu,
            isSaving: isAddingEdu
          }
        )
      ] })
    ] })
  ] });
}
export {
  JobSeekerProfile as default
};
