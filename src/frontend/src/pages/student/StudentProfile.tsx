import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Pencil, Save, Trophy, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetCourses,
  useGetEnrollmentsByStudent,
  useGetStudentProfile,
  useUpdateUser,
  useUpsertStudentProfile,
} from "../../hooks/useBackend";
import { useAuthStore } from "../../store/auth";
import type { Course, Enrollment, StudentProfile } from "../../types";

const INCOME_OPTIONS = [
  "Below 1 Lakh",
  "1-3 Lakhs",
  "3-5 Lakhs",
  "5-10 Lakhs",
  "Above 10 Lakhs",
];
const EDUCATION_OPTIONS = [
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate",
  "Post Graduate",
];

function PlacementBadge({ status }: { status: string }) {
  const cfg: Record<string, string> = {
    Placed: "bg-green-100 text-green-800 border-green-300",
    "In Progress": "bg-amber-100 text-amber-800 border-amber-300",
    "Not Started": "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge
      variant="outline"
      className={`text-sm px-3 py-1 ${cfg[status] ?? cfg["Not Started"]}`}
    >
      <Trophy size={13} className="mr-1.5 inline" />
      {status}
    </Badge>
  );
}

export default function StudentProfilePage() {
  const { user, updateUser: storeUpdateUser } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: profile, isLoading: loadingProfile } =
    useGetStudentProfile(userId);
  const { data: enrollments = [], isLoading: loadingEnrollments } =
    useGetEnrollmentsByStudent(userId);
  const { data: courses = [] } = useGetCourses();

  const upsertProfile = useUpsertStudentProfile();
  const updateUser = useUpdateUser();

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [familyIncome, setFamilyIncome] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [qualification, setQualification] = useState("");

  useEffect(() => {
    if (profile) {
      setAddress(profile.address ?? "");
      setFatherName(profile.fatherName ?? "");
      setMotherName(profile.motherName ?? "");
      setFamilyIncome(profile.familyIncome ?? "");
      setEducationLevel(profile.educationLevel ?? "");
      setQualification(profile.qualification ?? "");
      if (profile.dateOfBirth) {
        setDob(
          new Date(Number(profile.dateOfBirth) / 1_000_000)
            .toISOString()
            .split("T")[0],
        );
      }
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const dobTs = dob
        ? BigInt(new Date(dob).getTime() * 1_000_000)
        : undefined;
      await updateUser.mutateAsync({
        id: userId,
        firstName,
        lastName,
        phone: phone || null,
      });
      const updatedProfile: StudentProfile = {
        userId,
        address: address || undefined,
        dateOfBirth: dobTs,
        fatherName: fatherName || undefined,
        motherName: motherName || undefined,
        familyIncome: familyIncome || undefined,
        educationLevel: educationLevel || undefined,
        qualification: qualification || undefined,
        placementStatus: profile?.placementStatus ?? "Not Started",
        centerId: profile?.centerId,
      };
      await upsertProfile.mutateAsync({ userId, profile: updatedProfile });
      if (user)
        storeUpdateUser({
          ...user,
          firstName,
          lastName,
          phone: phone || "",
        });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const enrolledCourses = enrollments
    .map((e: Enrollment) => ({
      enrollment: e,
      course: courses.find((c: Course) => c.id === e.courseId),
    }))
    .filter(({ course }: { course: Course | undefined }) => !!course) as {
    enrollment: Enrollment;
    course: Course;
  }[];

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  if (loadingProfile) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-lg" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="student-profile">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Profile
        </h1>
        {!editing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setEditing(true)}
            data-ocid="profile-edit-btn"
          >
            <Pencil size={14} className="mr-1.5" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditing(false)}
            >
              <X size={14} className="mr-1" />
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={updateUser.isPending || upsertProfile.isPending}
              data-ocid="profile-save-btn"
            >
              <Save size={14} className="mr-1.5" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <Card>
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center gap-3">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-display font-bold text-lg text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <User size={12} />
              Student
            </Badge>
            <Separator />
            <PlacementBadge
              status={profile?.placementStatus ?? "Not Started"}
            />
            <div className="w-full text-left space-y-2 mt-1">
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Enrolled Courses</span>
                <span className="font-semibold text-foreground">
                  {enrollments.length}
                </span>
              </div>
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Completed</span>
                <span className="font-semibold text-foreground">
                  {
                    enrollments.filter(
                      (e: Enrollment) => e.status === "completed",
                    ).length
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="w-full">
              <TabsTrigger value="personal" className="flex-1">
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex-1">
                Academic Records
              </TabsTrigger>
              <TabsTrigger value="family" className="flex-1">
                Family Info
              </TabsTrigger>
            </TabsList>

            {/* Personal Details */}
            <TabsContent value="personal">
              <Card>
                <CardContent className="pt-5 pb-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!editing}
                        data-ocid="input-firstname"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!editing}
                        data-ocid="input-lastname"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={user?.email ?? ""}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!editing}
                        placeholder="+91 XXXXX XXXXX"
                        data-ocid="input-phone"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        disabled={!editing}
                        data-ocid="input-dob"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={!editing}
                      placeholder="Full address"
                      data-ocid="input-address"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Academic Records */}
            <TabsContent value="academic">
              <Card>
                <CardContent className="pt-5 pb-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="educationLevel">Education Level</Label>
                    {editing ? (
                      <Select
                        value={educationLevel}
                        onValueChange={setEducationLevel}
                      >
                        <SelectTrigger
                          id="educationLevel"
                          data-ocid="select-education"
                        >
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {EDUCATION_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input value={educationLevel || "—"} disabled />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="qualification">
                      Qualification / Degree
                    </Label>
                    <Input
                      id="qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      disabled={!editing}
                      placeholder="e.g. B.Sc. Computer Science"
                      data-ocid="input-qualification"
                    />
                  </div>
                  <Separator />
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <GraduationCap size={15} className="text-primary" />
                    Enrolled Courses
                  </CardTitle>
                  {loadingEnrollments ? (
                    <Skeleton className="h-16 rounded" />
                  ) : enrolledCourses.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No courses enrolled yet.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {enrolledCourses.map(
                        ({
                          enrollment,
                          course,
                        }: {
                          enrollment: Enrollment;
                          course: Course;
                        }) => (
                          <div
                            key={enrollment.id}
                            className="flex items-center justify-between p-3 bg-muted/40 rounded-lg"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">
                                {course.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {course.category}
                              </p>
                            </div>
                            <Badge
                              variant={
                                enrollment.status === "completed"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs shrink-0"
                            >
                              {enrollment.status}
                            </Badge>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Family Info */}
            <TabsContent value="family">
              <Card>
                <CardContent className="pt-5 pb-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input
                      id="fatherName"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      disabled={!editing}
                      placeholder="Father's full name"
                      data-ocid="input-fathername"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input
                      id="motherName"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      disabled={!editing}
                      placeholder="Mother's full name"
                      data-ocid="input-mothername"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="familyIncome">Family Income Level</Label>
                    {editing ? (
                      <Select
                        value={familyIncome}
                        onValueChange={setFamilyIncome}
                      >
                        <SelectTrigger
                          id="familyIncome"
                          data-ocid="select-income"
                        >
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent>
                          {INCOME_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input value={familyIncome || "—"} disabled />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
