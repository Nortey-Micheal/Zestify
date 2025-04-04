import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, ArrowBigLeftDashIcon, LoaderPinwheel, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useSignup from "@/hooks/users/useSignup"
import { Link } from "react-router"
import { toast } from "sonner"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { error, isLoading, signup} = useSignup()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setProfileImage(file)
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {

      await signup({...formData,profilePicture:profileImage!})
      
    }

    // Reset form after successful submission
    if (!error && (error?.length)! > 0) {
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      setProfileImagePreview(null)
      setProfileImage(null)
    }
  }

  useEffect(() => {
    (error?.length)! > 0 && toast.error(error)
  },[error])

  return (
    <Card className="w-[95vw] max-w-md mx-auto lg:relative ">
      <CardHeader>
        <CardTitle className="text-2xl font-[young-serif] ">Create an account</CardTitle>
        <CardDescription>Enter your information to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="w-24 h-24 mb-2">
              <AvatarImage src={profileImagePreview || ""} alt="Profile" />
              <AvatarFallback className="bg-muted text-muted-foreground text-lg">
                {profileImagePreview ? "You" : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <Label
                htmlFor="picture"
                className="flex items-center gap-2 text-sm cursor-pointer px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Upload size={16} />
                {profileImagePreview ? "Change picture" : "Upload picture (optional)"}
              </Label>
            </div>
          </div>

          {
            isLoading && (
              <div className="bg-(--dark-charcoal) h-[100vh] w-[100vw] absolute left-0 top-0 flex items-center justify-center ">
                <LoaderPinwheel className=" w-25 h-25"/>
              </div>
            )
          }

          <Link to={'/'} className="flex items-center cursor-pointer fixed lg:absolute lg:-left-25 top-3 left-3  bg-(--zesty-orange) rounded-xl px-3 py-1 text-(--rose-white) "><ArrowBigLeftDashIcon /> <span className="hidden md:block">Back</span></Link>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "border-destructive" : ""}
            />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
          </div>

          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Please fix the errors above before submitting.</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="cursor-pointer w-full bg-(--zesty-orange) hover:bg-(--rich-brown) text-xl ">
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

