"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AlertCircle, Check, Globe, Mail, Save, Server, SettingsIcon, Shield, Tv, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const generalFormSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  siteUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  logoUrl: z
    .string()
    .url({
      message: "Please enter a valid URL for your logo.",
    })
    .optional()
    .or(z.literal("")),
  faviconUrl: z
    .string()
    .url({
      message: "Please enter a valid URL for your favicon.",
    })
    .optional()
    .or(z.literal("")),
  maintenanceMode: z.boolean().default(false),
})

const contentFormSchema = z.object({
  defaultVideoQuality: z.string(),
  autoplayVideos: z.boolean().default(true),
  defaultSubtitleLanguage: z.string(),
  maxEpisodesPerPage: z.string(),
  showAdultContent: z.boolean().default(false),
  contentCacheTime: z.string(),
})

const userFormSchema = z.object({
  allowRegistration: z.boolean().default(true),
  requireEmailVerification: z.boolean().default(true),
  defaultUserRole: z.string(),
  sessionTimeout: z.string(),
  maxLoginAttempts: z.string(),
  passwordMinLength: z.string(),
})

const apiFormSchema = z.object({
  corsAllowedOrigins: z.string(),
  rateLimitRequests: z.string(),
  rateLimitInterval: z.string(),
  enableApiLogging: z.boolean().default(true),
})

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  // General Settings Form
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "AnimeStream",
      siteUrl: "https://animestream.example.com",
      contactEmail: "admin@animestream.example.com",
      logoUrl: "https://example.com/logo.png",
      faviconUrl: "https://example.com/favicon.ico",
      maintenanceMode: false,
    },
  })

  // Content Settings Form
  const contentForm = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      defaultVideoQuality: "720p",
      autoplayVideos: true,
      defaultSubtitleLanguage: "english",
      maxEpisodesPerPage: "24",
      showAdultContent: false,
      contentCacheTime: "3600",
    },
  })

  // User Settings Form
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      allowRegistration: true,
      requireEmailVerification: true,
      defaultUserRole: "user",
      sessionTimeout: "86400",
      maxLoginAttempts: "5",
      passwordMinLength: "8",
    },
  })

  // API Settings Form
  const apiForm = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      corsAllowedOrigins: "*",
      rateLimitRequests: "100",
      rateLimitInterval: "60",
      enableApiLogging: true,
    },
  })

  function onSubmitGeneral(data: z.infer<typeof generalFormSchema>) {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "General settings updated",
        description: "Your general settings have been saved successfully.",
        action: (
          <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        ),
      })
      console.log(data)
    }, 1000)
  }

  function onSubmitContent(data: z.infer<typeof contentFormSchema>) {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Content settings updated",
        description: "Your content settings have been saved successfully.",
        action: (
          <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        ),
      })
      console.log(data)
    }, 1000)
  }

  function onSubmitUser(data: z.infer<typeof userFormSchema>) {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "User settings updated",
        description: "Your user settings have been saved successfully.",
        action: (
          <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        ),
      })
      console.log(data)
    }, 1000)
  }

  function onSubmitApi(data: z.infer<typeof apiFormSchema>) {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "API settings updated",
        description: "Your API settings have been saved successfully.",
        action: (
          <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        ),
      })
      console.log(data)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-6 space-y-8 pb-16">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your platform settings and configurations</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-background sticky top-0 z-10 w-full border-b pb-4">
          <TabsList className="w-full max-w-3xl grid grid-cols-4 h-11">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">User</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">API</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure the basic settings for your anime streaming platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form id="general-form" onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={generalForm.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Name</FormLabel>
                            <FormControl>
                              <Input placeholder="AnimeStream" {...field} />
                            </FormControl>
                            <FormDescription>The name of your anime streaming platform</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={generalForm.control}
                        name="siteUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              <Globe className="h-3.5 w-3.5" />
                              Site URL
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://animestream.example.com" {...field} />
                            </FormControl>
                            <FormDescription>The URL of your anime streaming platform</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={generalForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            Contact Email
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="admin@animestream.example.com" {...field} />
                          </FormControl>
                          <FormDescription>The email address users can contact for support</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={generalForm.control}
                        name="logoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/logo.png" {...field} />
                            </FormControl>
                            <FormDescription>The URL of your site logo (optional)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={generalForm.control}
                        name="faviconUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Favicon URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/favicon.ico" {...field} />
                            </FormControl>
                            <FormDescription>The URL of your site favicon (optional)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <FormField
                      control={generalForm.control}
                      name="maintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Maintenance Mode</FormLabel>
                            <FormDescription>Enable maintenance mode to temporarily disable the site</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
                <div className="text-sm text-muted-foreground">Last updated: May 12, 2025</div>
                <Button type="submit" form="general-form" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span className="animate-pulse">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tv className="h-5 w-5" />
                  Content Settings
                </CardTitle>
                <CardDescription>Configure how anime content is displayed and managed</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...contentForm}>
                  <form id="content-form" onSubmit={contentForm.handleSubmit(onSubmitContent)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={contentForm.control}
                        name="defaultVideoQuality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Video Quality</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a quality" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="360p">360p</SelectItem>
                                <SelectItem value="480p">480p</SelectItem>
                                <SelectItem value="720p">720p (HD)</SelectItem>
                                <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                                <SelectItem value="1440p">1440p (2K)</SelectItem>
                                <SelectItem value="2160p">2160p (4K)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>The default video quality for anime playback</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contentForm.control}
                        name="defaultSubtitleLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Subtitle Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="german">German</SelectItem>
                                <SelectItem value="japanese">Japanese</SelectItem>
                                <SelectItem value="korean">Korean</SelectItem>
                                <SelectItem value="chinese">Chinese</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>The default language for anime subtitles</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={contentForm.control}
                        name="maxEpisodesPerPage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Episodes Per Page</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>Maximum number of episodes to display per page</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contentForm.control}
                        name="contentCacheTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content Cache Time (seconds)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>How long to cache content data in seconds</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Playback Settings</h3>
                      <FormField
                        control={contentForm.control}
                        name="autoplayVideos"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Autoplay Videos</FormLabel>
                              <FormDescription>Automatically play videos when the page loads</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Content Restrictions</h3>
                      <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Content Warning</AlertTitle>
                        <AlertDescription>
                          Enabling adult content may require additional age verification measures to comply with local
                          regulations.
                        </AlertDescription>
                      </Alert>
                      <FormField
                        control={contentForm.control}
                        name="showAdultContent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Show Adult Content</FormLabel>
                              <FormDescription>Allow adult content to be displayed on the platform</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
                <div className="text-sm text-muted-foreground">Last updated: May 12, 2025</div>
                <Button type="submit" form="content-form" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span className="animate-pulse">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* User Settings */}
        <TabsContent value="user" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Settings
                </CardTitle>
                <CardDescription>Configure user account and authentication settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...userForm}>
                  <form id="user-form" onSubmit={userForm.handleSubmit(onSubmitUser)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Registration Settings</h3>
                      <div className="grid gap-4">
                        <FormField
                          control={userForm.control}
                          name="allowRegistration"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Allow Registration</FormLabel>
                                <FormDescription>Allow new users to register on the platform</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={userForm.control}
                          name="requireEmailVerification"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Require Email Verification</FormLabel>
                                <FormDescription>Require users to verify their email address</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">User Roles & Permissions</h3>
                      <FormField
                        control={userForm.control}
                        name="defaultUserRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              <Shield className="h-3.5 w-3.5" />
                              Default User Role
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="moderator">Moderator</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>The default role assigned to new users</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security Settings</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={userForm.control}
                          name="sessionTimeout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Session Timeout (seconds)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>How long user sessions remain active</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={userForm.control}
                          name="maxLoginAttempts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Login Attempts</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>Maximum failed login attempts before lockout</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={userForm.control}
                        name="passwordMinLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Password Length</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>Minimum number of characters required for passwords</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
                <div className="text-sm text-muted-foreground">Last updated: May 12, 2025</div>
                <Button type="submit" form="user-form" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span className="animate-pulse">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  API Settings
                </CardTitle>
                <CardDescription>Configure API access and rate limiting</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...apiForm}>
                  <form id="api-form" onSubmit={apiForm.handleSubmit(onSubmitApi)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Access Control</h3>
                      <FormField
                        control={apiForm.control}
                        name="corsAllowedOrigins"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CORS Allowed Origins</FormLabel>
                            <FormControl>
                              <Input placeholder="*" {...field} />
                            </FormControl>
                            <FormDescription>Comma-separated list of allowed origins (use * for all)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Rate Limiting</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={apiForm.control}
                          name="rateLimitRequests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rate Limit Requests</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>Maximum number of requests per interval</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={apiForm.control}
                          name="rateLimitInterval"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rate Limit Interval (seconds)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>Time interval for rate limiting in seconds</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Monitoring</h3>
                      <FormField
                        control={apiForm.control}
                        name="enableApiLogging"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Enable API Logging</FormLabel>
                              <FormDescription>Log all API requests for monitoring and debugging</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-4">
                <div className="text-sm text-muted-foreground">Last updated: May 12, 2025</div>
                <Button type="submit" form="api-form" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span className="animate-pulse">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
