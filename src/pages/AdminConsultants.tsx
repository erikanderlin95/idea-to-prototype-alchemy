import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Pencil,
  User,
  Trash2,
  Building2,
  X,
} from "lucide-react";

interface Consultant {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
  full_bio: string | null;
  areas_of_focus: string[];
  services_offered: string[];
  patient_types: string[];
  is_active: boolean;
}

interface Clinic {
  id: string;
  name: string;
}

const AdminConsultants = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingConsultant, setEditingConsultant] = useState<Consultant | null>(null);
  const [recommendations, setRecommendations] = useState<Record<string, string[]>>({});

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    title: "Wellness Advisor",
    photo_url: "",
    short_bio: "",
    full_bio: "",
    areas_of_focus: [] as string[],
    services_offered: [] as string[],
    patient_types: [] as string[],
    is_active: true,
  });
  const [newArea, setNewArea] = useState("");
  const [newService, setNewService] = useState("");
  const [newPatientType, setNewPatientType] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch all consultants (admin view)
    const { data: consultantsData } = await supabase
      .from("consultants")
      .select("*")
      .order("name");

    if (consultantsData) {
      setConsultants(consultantsData);

      // Fetch recommendations for each consultant
      const recs: Record<string, string[]> = {};
      for (const c of consultantsData) {
        const { data: recData } = await supabase
          .from("consultant_clinic_recommendations")
          .select("clinic_id")
          .eq("consultant_id", c.id);
        if (recData) {
          recs[c.id] = recData.map((r) => r.clinic_id);
        }
      }
      setRecommendations(recs);
    }

    // Fetch clinics
    const { data: clinicsData } = await supabase
      .from("clinics")
      .select("id, name")
      .order("name");

    if (clinicsData) {
      setClinics(clinicsData);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "Wellness Advisor",
      photo_url: "",
      short_bio: "",
      full_bio: "",
      areas_of_focus: [],
      services_offered: [],
      patient_types: [],
      is_active: true,
    });
    setNewArea("");
    setNewService("");
    setNewPatientType("");
    setEditingConsultant(null);
  };

  const openEditDialog = (consultant: Consultant) => {
    setEditingConsultant(consultant);
    setFormData({
      name: consultant.name,
      title: consultant.title,
      photo_url: consultant.photo_url || "",
      short_bio: consultant.short_bio || "",
      full_bio: consultant.full_bio || "",
      areas_of_focus: consultant.areas_of_focus || [],
      services_offered: consultant.services_offered || [],
      patient_types: consultant.patient_types || [],
      is_active: consultant.is_active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({ title: t("admin.nameRequired"), variant: "destructive" });
      return;
    }

    const payload = {
      name: formData.name.trim(),
      title: formData.title.trim(),
      photo_url: formData.photo_url.trim() || null,
      short_bio: formData.short_bio.trim() || null,
      full_bio: formData.full_bio.trim() || null,
      areas_of_focus: formData.areas_of_focus,
      services_offered: formData.services_offered,
      patient_types: formData.patient_types,
      is_active: formData.is_active,
    };

    if (editingConsultant) {
      const { error } = await supabase
        .from("consultants")
        .update(payload)
        .eq("id", editingConsultant.id);

      if (error) {
        toast({ title: t("admin.updateError"), variant: "destructive" });
      } else {
        toast({ title: t("admin.consultantUpdated") });
        setDialogOpen(false);
        resetForm();
        fetchData();
      }
    } else {
      const { error } = await supabase.from("consultants").insert(payload);

      if (error) {
        toast({ title: t("admin.createError"), variant: "destructive" });
      } else {
        toast({ title: t("admin.consultantCreated") });
        setDialogOpen(false);
        resetForm();
        fetchData();
      }
    }
  };

  const toggleActive = async (consultant: Consultant) => {
    const { error } = await supabase
      .from("consultants")
      .update({ is_active: !consultant.is_active })
      .eq("id", consultant.id);

    if (!error) {
      fetchData();
    }
  };

  const addRecommendation = async (consultantId: string, clinicId: string) => {
    const { error } = await supabase
      .from("consultant_clinic_recommendations")
      .insert({ consultant_id: consultantId, clinic_id: clinicId });

    if (!error) {
      fetchData();
    }
  };

  const removeRecommendation = async (consultantId: string, clinicId: string) => {
    const { error } = await supabase
      .from("consultant_clinic_recommendations")
      .delete()
      .eq("consultant_id", consultantId)
      .eq("clinic_id", clinicId);

    if (!error) {
      fetchData();
    }
  };

  const addArrayItem = (field: "areas_of_focus" | "services_offered" | "patient_types", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
    }
  };

  const removeArrayItem = (field: "areas_of_focus" | "services_offered" | "patient_types", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t("admin.consultantsTitle")}
              </h1>
              <p className="text-muted-foreground">
                {t("admin.consultantsDesc")}
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("admin.addConsultant")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingConsultant ? t("admin.editConsultant") : t("admin.addConsultant")}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{t("admin.name")}</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("admin.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <Label>{t("admin.title")}</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder={t("admin.titlePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>{t("admin.photoUrl")}</Label>
                    <Input
                      value={formData.photo_url}
                      onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label>{t("admin.shortBio")}</Label>
                    <Textarea
                      value={formData.short_bio}
                      onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
                      placeholder={t("admin.shortBioPlaceholder")}
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>{t("admin.fullBio")}</Label>
                    <Textarea
                      value={formData.full_bio}
                      onChange={(e) => setFormData({ ...formData, full_bio: e.target.value })}
                      placeholder={t("admin.fullBioPlaceholder")}
                      rows={4}
                    />
                  </div>

                  {/* Areas of Focus */}
                  <div>
                    <Label>{t("admin.areasOfFocus")}</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        placeholder={t("admin.addAreaPlaceholder")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem("areas_of_focus", newArea);
                            setNewArea("");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          addArrayItem("areas_of_focus", newArea);
                          setNewArea("");
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.areas_of_focus.map((area, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {area}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeArrayItem("areas_of_focus", index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Services Offered */}
                  <div>
                    <Label>{t("admin.servicesOffered")}</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        placeholder={t("admin.addServicePlaceholder")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem("services_offered", newService);
                            setNewService("");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          addArrayItem("services_offered", newService);
                          setNewService("");
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.services_offered.map((service, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {service}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeArrayItem("services_offered", index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Patient Types */}
                  <div>
                    <Label>{t("admin.patientTypes")}</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={newPatientType}
                        onChange={(e) => setNewPatientType(e.target.value)}
                        placeholder={t("admin.addPatientTypePlaceholder")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem("patient_types", newPatientType);
                            setNewPatientType("");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          addArrayItem("patient_types", newPatientType);
                          setNewPatientType("");
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.patient_types.map((type, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {type}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeArrayItem("patient_types", index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label>{t("admin.active")}</Label>
                  </div>

                  <Button className="w-full" onClick={handleSubmit}>
                    {editingConsultant ? t("admin.update") : t("admin.create")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Consultants List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : consultants.length > 0 ? (
            <div className="space-y-4">
              {consultants.map((consultant) => (
                <Card key={consultant.id} className={!consultant.is_active ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Photo */}
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        {consultant.photo_url ? (
                          <img
                            src={consultant.photo_url}
                            alt={consultant.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {consultant.name}
                          </h3>
                          <Badge variant={consultant.is_active ? "default" : "secondary"}>
                            {consultant.is_active ? t("admin.active") : t("admin.inactive")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {consultant.title}
                        </p>
                        {consultant.areas_of_focus && consultant.areas_of_focus.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {consultant.areas_of_focus.map((area, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(consultant)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Switch
                          checked={consultant.is_active}
                          onCheckedChange={() => toggleActive(consultant)}
                        />
                      </div>
                    </div>

                    {/* Recommended Clinics */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {t("admin.recommendedClinics")}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        {recommendations[consultant.id]?.map((clinicId) => {
                          const clinic = clinics.find((c) => c.id === clinicId);
                          return clinic ? (
                            <Badge key={clinicId} variant="secondary" className="gap-1">
                              {clinic.name}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => removeRecommendation(consultant.id, clinicId)}
                              />
                            </Badge>
                          ) : null;
                        })}
                        <Select
                          onValueChange={(value) => addRecommendation(consultant.id, value)}
                        >
                          <SelectTrigger className="w-40 h-8">
                            <SelectValue placeholder={t("admin.addClinic")} />
                          </SelectTrigger>
                          <SelectContent>
                            {clinics
                              .filter((c) => !recommendations[consultant.id]?.includes(c.id))
                              .map((clinic) => (
                                <SelectItem key={clinic.id} value={clinic.id}>
                                  {clinic.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {t("admin.noConsultants")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("admin.noConsultantsDesc")}
                </p>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("admin.addConsultant")}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminConsultants;
