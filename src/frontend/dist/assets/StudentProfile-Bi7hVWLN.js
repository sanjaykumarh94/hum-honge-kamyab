import { c as createLucideIcon, f as useAuthStore, r as reactExports, j as jsxRuntimeExports, n as Skeleton, a as Button, X, A as Avatar, t as AvatarFallback, B as Badge, p as User, S as Separator, G as GraduationCap, T as Trophy } from "./index-BFdoklgf.js";
import { C as Card, a as CardContent, c as CardTitle } from "./card-CIs8rJlK.js";
import { I as Input } from "./input-Dt9GIaMX.js";
import { L as Label } from "./label-CtntKOhe.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BdpOzEfG.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-B2JPa7zl.js";
import { u as ue } from "./index-t444bNAk.js";
import { m as useGetStudentProfile, n as useGetEnrollmentsByStudent, e as useGetCourses, r as useUpsertStudentProfile, p as useUpdateUser } from "./useBackend-Dhw_nMAY.js";
import { P as Pencil } from "./pencil-DYdYdDm1.js";
import "./index-q7D4Kz4T.js";
import "./index-BaLXypA6.js";
import "./index-CG7nvONz.js";
import "./index-XioNHgJQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const INCOME_OPTIONS = [
  "Below 1 Lakh",
  "1-3 Lakhs",
  "3-5 Lakhs",
  "5-10 Lakhs",
  "Above 10 Lakhs"
];
const EDUCATION_OPTIONS = [
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post Graduate"
];
function PlacementBadge({ status }) {
  const cfg = {
    Placed: "bg-green-100 text-green-800 border-green-300",
    "In Progress": "bg-amber-100 text-amber-800 border-amber-300",
    "Not Started": "bg-muted text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: `text-sm px-3 py-1 ${cfg[status] ?? cfg["Not Started"]}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 13, className: "mr-1.5 inline" }),
        status
      ]
    }
  );
}
function StudentProfilePage() {
  var _a, _b;
  const { user, updateUser: storeUpdateUser } = useAuthStore();
  const userId = (user == null ? void 0 : user.id) ?? "";
  const { data: profile, isLoading: loadingProfile } = useGetStudentProfile(userId);
  const { data: enrollments = [], isLoading: loadingEnrollments } = useGetEnrollmentsByStudent(userId);
  const { data: courses = [] } = useGetCourses();
  const upsertProfile = useUpsertStudentProfile();
  const updateUser = useUpdateUser();
  const [editing, setEditing] = reactExports.useState(false);
  const [firstName, setFirstName] = reactExports.useState((user == null ? void 0 : user.firstName) ?? "");
  const [lastName, setLastName] = reactExports.useState((user == null ? void 0 : user.lastName) ?? "");
  const [phone, setPhone] = reactExports.useState((user == null ? void 0 : user.phone) ?? "");
  const [address, setAddress] = reactExports.useState("");
  const [dob, setDob] = reactExports.useState("");
  const [fatherName, setFatherName] = reactExports.useState("");
  const [motherName, setMotherName] = reactExports.useState("");
  const [familyIncome, setFamilyIncome] = reactExports.useState("");
  const [educationLevel, setEducationLevel] = reactExports.useState("");
  const [qualification, setQualification] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (profile) {
      setAddress(profile.address ?? "");
      setFatherName(profile.fatherName ?? "");
      setMotherName(profile.motherName ?? "");
      setFamilyIncome(profile.familyIncome ?? "");
      setEducationLevel(profile.educationLevel ?? "");
      setQualification(profile.qualification ?? "");
      if (profile.dateOfBirth) {
        setDob(
          new Date(Number(profile.dateOfBirth) / 1e6).toISOString().split("T")[0]
        );
      }
    }
  }, [profile]);
  const handleSave = async () => {
    try {
      const dobTs = dob ? BigInt(new Date(dob).getTime() * 1e6) : void 0;
      await updateUser.mutateAsync({
        id: userId,
        firstName,
        lastName,
        phone: phone || null
      });
      const updatedProfile = {
        userId,
        address: address || void 0,
        dateOfBirth: dobTs,
        fatherName: fatherName || void 0,
        motherName: motherName || void 0,
        familyIncome: familyIncome || void 0,
        educationLevel: educationLevel || void 0,
        qualification: qualification || void 0,
        placementStatus: (profile == null ? void 0 : profile.placementStatus) ?? "Not Started",
        centerId: profile == null ? void 0 : profile.centerId
      };
      await upsertProfile.mutateAsync({ userId, profile: updatedProfile });
      if (user)
        storeUpdateUser({
          ...user,
          firstName,
          lastName,
          phone: phone || ""
        });
      ue.success("Profile updated successfully!");
      setEditing(false);
    } catch {
      ue.error("Failed to save profile. Please try again.");
    }
  };
  const enrolledCourses = enrollments.map((e) => ({
    enrollment: e,
    course: courses.find((c) => c.id === e.courseId)
  })).filter(({ course }) => !!course);
  const initials = user ? `${((_a = user.firstName) == null ? void 0 : _a[0]) ?? ""}${((_b = user.lastName) == null ? void 0 : _b[0]) ?? ""}`.toUpperCase() : "?";
  if (loadingProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-lg" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "student-profile", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Profile" }),
      !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => setEditing(true),
          "data-ocid": "profile-edit-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14, className: "mr-1.5" }),
            "Edit Profile"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => setEditing(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
              "Cancel"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleSave,
            disabled: updateUser.isPending || upsertProfile.isPending,
            "data-ocid": "profile-save-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14, className: "mr-1.5" }),
              "Save Changes"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-6 flex flex-col items-center text-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-20 h-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-bold text-2xl", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground", children: [
            user == null ? void 0 : user.firstName,
            " ",
            user == null ? void 0 : user.lastName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user == null ? void 0 : user.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12 }),
          "Student"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlacementBadge,
          {
            status: (profile == null ? void 0 : profile.placementStatus) ?? "Not Started"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full text-left space-y-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Enrolled Courses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: enrollments.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Completed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: enrollments.filter(
              (e) => e.status === "completed"
            ).length })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "personal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "personal", className: "flex-1", children: "Personal Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "academic", className: "flex-1", children: "Academic Records" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "family", className: "flex-1", children: "Family Info" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "personal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "firstName", children: "First Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "firstName",
                  value: firstName,
                  onChange: (e) => setFirstName(e.target.value),
                  disabled: !editing,
                  "data-ocid": "input-firstname"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lastName", children: "Last Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "lastName",
                  value: lastName,
                  onChange: (e) => setLastName(e.target.value),
                  disabled: !editing,
                  "data-ocid": "input-lastname"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email",
                value: (user == null ? void 0 : user.email) ?? "",
                disabled: true,
                className: "bg-muted"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  disabled: !editing,
                  placeholder: "+91 XXXXX XXXXX",
                  "data-ocid": "input-phone"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dob", children: "Date of Birth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "dob",
                  type: "date",
                  value: dob,
                  onChange: (e) => setDob(e.target.value),
                  disabled: !editing,
                  "data-ocid": "input-dob"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "address",
                value: address,
                onChange: (e) => setAddress(e.target.value),
                disabled: !editing,
                placeholder: "Full address",
                "data-ocid": "input-address"
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "academic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "educationLevel", children: "Education Level" }),
            editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: educationLevel,
                onValueChange: setEducationLevel,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "educationLevel",
                      "data-ocid": "select-education",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EDUCATION_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: educationLevel || "—", disabled: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "qualification", children: "Qualification / Degree" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "qualification",
                value: qualification,
                onChange: (e) => setQualification(e.target.value),
                disabled: !editing,
                placeholder: "e.g. B.Sc. Computer Science",
                "data-ocid": "input-qualification"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 15, className: "text-primary" }),
            "Enrolled Courses"
          ] }),
          loadingEnrollments ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded" }) : enrolledCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No courses enrolled yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: enrolledCourses.map(
            ({
              enrollment,
              course
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 bg-muted/40 rounded-lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: course.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: course.category })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: enrollment.status === "completed" ? "default" : "secondary",
                      className: "text-xs shrink-0",
                      children: enrollment.status
                    }
                  )
                ]
              },
              enrollment.id
            )
          ) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "family", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fatherName", children: "Father's Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fatherName",
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
                disabled: !editing,
                placeholder: "Father's full name",
                "data-ocid": "input-fathername"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "motherName", children: "Mother's Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "motherName",
                value: motherName,
                onChange: (e) => setMotherName(e.target.value),
                disabled: !editing,
                placeholder: "Mother's full name",
                "data-ocid": "input-mothername"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "familyIncome", children: "Family Income Level" }),
            editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: familyIncome,
                onValueChange: setFamilyIncome,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "familyIncome",
                      "data-ocid": "select-income",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select income range" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: INCOME_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: familyIncome || "—", disabled: true })
          ] })
        ] }) }) })
      ] }) })
    ] })
  ] });
}
export {
  StudentProfilePage as default
};
