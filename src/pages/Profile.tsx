import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Loader2, Mail, User, ShieldCheck } from "lucide-react";

export default function Profile() {
  const { session, isLoading } = useSessionContext();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading your profile…</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Sign in required</CardTitle>
            <CardDescription>Please sign in to access your TrucksOnFlex profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/auth">Go to login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 md:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Account profile</h1>
            <p className="text-muted-foreground text-lg">
              Manage the details tied to your TrucksOnFlex account. Your information helps us tailor financing and rental experiences.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline" className="rounded-full border-primary/60 text-primary">
                <ShieldCheck className="mr-2 h-4 w-4" /> Email verified: {user.email_confirmed_at ? "Yes" : "Pending"}
              </Badge>
              {user.last_sign_in_at && <span>Last signed in {new Date(user.last_sign_in_at).toLocaleString()}</span>}
            </div>
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Personal details</CardTitle>
              <CardDescription>Keep your contact details up to date for contracts and delivery coordination.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="full-name" className="pl-10" placeholder="Add your name" value={user.user_metadata.full_name ?? ""} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" className="pl-10" value={user.email ?? ""} readOnly />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" placeholder="Add phone number" value={user.user_metadata.phone ?? ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Add company" value={user.user_metadata.company ?? ""} readOnly />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="notes">Additional notes</Label>
                <p className="text-sm text-muted-foreground">
                  Need to update your profile? Contact TrucksOnFlex support so we can securely make changes on your behalf while preserving financing records.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
