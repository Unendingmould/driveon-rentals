import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock, User, Phone, MapPin, Globe } from "lucide-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmail, signUpWithEmail } from "@/services/auth";
import { usePageTitle } from "@/hooks/usePageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGeoDirectory } from "@/hooks/useDriveonData";

const emailRedirectPath = 
  typeof window !== "undefined"
    ? `${window.location.origin}/auth?mode=signin&verified=1`
    : "";

type AuthMode = "signin" | "signup";

interface GeoCountry {
  code: string;
  name: string;
  states: Array<{ code: string; name: string; cities: string[] }>;
}

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isLoading, supabaseClient } = useSessionContext();

  const initialMode = useMemo<AuthMode>(() => {
    const params = new URLSearchParams(location.search);
    return params.get("mode") === "signup" ? "signup" : "signin";
  }, [location.search]);

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<string>("");
  const [stateRegion, setStateRegion] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePageTitle(mode === "signin" ? "Sign in" : "Create account");

  const { data: geoDirectory, isLoading: geoLoading } = useGeoDirectory();

  const countries = useMemo<GeoCountry[]>(() => geoDirectory ?? [], [geoDirectory]);

  const selectedCountry = useMemo<GeoCountry | null>(
    () => countries.find((item) => item.code === country) ?? null,
    [countries, country]
  );

  const stateOptions = useMemo(() => selectedCountry?.states ?? [], [selectedCountry]);

  const selectedState = useMemo(
    () => stateOptions.find((state) => state.code === stateRegion) ?? null,
    [stateOptions, stateRegion]
  );

  const cityOptions = useMemo(() => selectedState?.cities ?? [], [selectedState]);

  useEffect(() => {
    if (countries.length === 0) return;
    if (country && !selectedCountry) {
      setCountry("");
      setStateRegion("");
      setCity("");
    }
  }, [countries, country, selectedCountry]);

  useEffect(() => {
    if (stateRegion && !selectedState) {
      setStateRegion("");
      setCity("");
    }
  }, [selectedState, stateRegion]);

  const redirectPath = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname ?? "/dashboard";

  useEffect(() => {
    if (!isLoading && session) {
      navigate(redirectPath, { replace: true });
    }
  }, [session, isLoading, navigate, redirectPath]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signin") {
        if (!email || !password) {
          setError("Please provide both email and password.");
          return;
        }

        const { error: signInError } = await signInWithEmail({
          email,
          password,
        }, supabaseClient);

        if (signInError) {
          setError(signInError.message);
          return;
        }

        toast({
          title: "Welcome back",
          description: "You are now signed in."
        });
        navigate(redirectPath, { replace: true });
      } else {
        if (!email || !password) {
          setError("Please provide both email and password.");
          return;
        }

        if (!firstName || !lastName || !phone || !country || !stateRegion || !city || !streetAddress) {
          setError("Please complete all required fields.");
          return;
        }

        if (!selectedCountry || !selectedState) {
          setError("Please select a valid country and state.");
          return;
        }

        const { error: signUpError } = await signUpWithEmail({
          email,
          password,
          emailRedirectTo: emailRedirectPath,
          metadata: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`.trim(),
            phone,
            country: selectedCountry.name,
            country_code: selectedCountry.code,
            state: selectedState.name,
            state_code: selectedState.code,
            city,
            street_address: streetAddress,
          },
        }, supabaseClient);

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        toast({
          title: "Check your inbox",
          description: "Confirm your email to activate your Trucksonflex account.",
        });
        setMode("signin");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setCountry("");
        setStateRegion("");
        setCity("");
        setStreetAddress("");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Preparing your Trucksonflex experience…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {mode === "signin" ? "Sign in" : "Create your account"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Access your Trucksonflex rentals and purchases."
              : "Join Trucksonflex to start renting or purchasing trucks."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="first-name"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="last-name"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Select
                        value={country}
                        onValueChange={(value) => {
                          setCountry(value);
                          setStateRegion("");
                          setCity("");
                        }}
                        disabled={geoLoading || countries.length === 0}
                        required
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder={geoLoading ? "Loading countries..." : "Select country"} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((option) => (
                            <SelectItem key={option.code} value={option.code}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Region</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Select
                        value={stateRegion}
                        onValueChange={(value) => {
                          setStateRegion(value);
                          setCity("");
                        }}
                        disabled={!selectedCountry || stateOptions.length === 0}
                        required
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue
                            placeholder={
                              !country
                                ? "Select country first"
                                : stateOptions.length === 0
                                ? "No states available"
                                : "Select state"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {stateOptions.map((option) => (
                            <SelectItem key={option.code} value={option.code}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Select value={city} onValueChange={setCity} disabled={!selectedState || cityOptions.length === 0} required>
                        <SelectTrigger className="pl-10">
                          <SelectValue
                            placeholder={
                              !stateRegion
                                ? "Select state first"
                                : cityOptions.length === 0
                                ? "No cities found"
                                : "Select city"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {cityOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street">Street address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="street"
                      placeholder="Street name, building number"
                      value={streetAddress}
                      onChange={(event) => setStreetAddress(event.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <span>
                New to Trucksonflex?{" "}
                <Button
                  variant="link"
                  className="px-1 font-semibold"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                  }}
                >
                  Create an account
                </Button>
              </span>
            ) : (
              <span>
                Already registered?{" "}
                <Button
                  variant="link"
                  className="px-1 font-semibold"
                  onClick={() => {
                    setMode("signin");
                    setError(null);
                  }}
                >
                  Sign in instead
                </Button>
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-xs text-muted-foreground">
          <p>
            By continuing, you agree to Trucksonflex’s terms and confirm you understand data usage for financing and rental decisions.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
