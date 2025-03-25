import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, ImageIcon, Plus, ArrowUp, ArrowDown } from "lucide-react"
import useAddRecipe from "@/hooks/recipes/useAddRecipe"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

interface Ingredient {
  id: string
  value: string
}

interface Instruction {
  id: string
  value: string
}

export default function RecipeForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [cookTime, setCookTime] = useState<number>()
  const [category, setCategory] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [instructions, setInstructions] = useState<Instruction[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { error, addRecipe} = useAddRecipe()
  const user = useSelector((state:RootState) => state.user)

  const addIngredient = () => {
    setIngredients([...ingredients, { id: `ingredient-${Date.now()}`, value: "" }])
  }

  const updateIngredient = (id: string, value: string) => {
    setIngredients(ingredients.map((item) => (item.id === id ? { ...item, value } : item)))
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((item) => item.id !== id))
  }

  const moveIngredient = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === ingredients.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newIngredients = [...ingredients]
    const temp = newIngredients[index]
    newIngredients[index] = newIngredients[newIndex]
    newIngredients[newIndex] = temp
    setIngredients(newIngredients)
  }

  const addInstruction = () => {
    setInstructions([...instructions, { id: `instruction-${Date.now()}`, value: "" }])
  }

  const updateInstruction = (id: string, value: string) => {
    setInstructions(instructions.map((item) => (item.id === id ? { ...item, value } : item)))
  }

  const removeInstruction = (id: string) => {
    setInstructions(instructions.filter((item) => item.id !== id))
  }

  const moveInstruction = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === instructions.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newInstructions = [...instructions]
    const temp = newInstructions[index]
    newInstructions[index] = newInstructions[newIndex]
    newInstructions[newIndex] = temp
    setInstructions(newInstructions)
  }

  const handleImagePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImagePreview = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !title ||
      !description ||
      !author ||
      !cookTime ||
      !category ||
      ingredients.length === 0 ||
      instructions.length === 0
    ) {
      alert("Please fill in all required fields")
      return
    }

    // Check if ingredients and instructions have values
    if (ingredients.some((item) => !item.value.trim()) || instructions.some((item) => !item.value.trim())) {
      alert("Please fill in all ingredients and instructions")
      return
    } 

    // Form submission logic would go here
    console.log({
      title,
      description,
      author,
      cookTime,
      category,
      ingredients,
      instructions,
      imagePreview,
    })

    await addRecipe({
      title,description,
      author,cookTime,category,
      ingredients,instructions,image
    })

    if (error) {
      console.log(error)
    }

    if (!error) {
      alert("Recipe submitted successfully!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-base">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Recipe title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the recipe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="author" className="text-base">
                  Author <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="author"
                  value={user ? user.name : author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Recipe author"
                  required
                  disabled={user.name ? true : false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cookTime" className="text-base">
                    Cook Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cookTime"
                    type="number"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.valueAsNumber)}
                    placeholder="e.g. 30 minutes"
                    required
                    accept='imagePreview/png, imagePreview/jpeg, imagePreview/jpg, imagePreview/jfif'
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-base">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="cursor-pointer" value="breakfast">Breakfast</SelectItem>
                      <SelectItem className="cursor-pointer" value="lunch">Lunch</SelectItem>
                      <SelectItem className="cursor-pointer" value="dinner">Dinner</SelectItem>
                      <SelectItem className="cursor-pointer" value="dessert">Dessert</SelectItem>
                      <SelectItem className="cursor-pointer" value="snack">Snack</SelectItem>
                      <SelectItem className="cursor-pointer" value="beverage">Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* ImagePreview Upload */}
            <div>
              <Label className="text-base">ImagePreview (Optional)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImagePreviewChange}
                  accept="imagePreview/*"
                  className="hidden"
                />

                {!imagePreview ? (
                  <div
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary"
                  >
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">Click to upload an imagePreview</div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Recipe preview"
                      className="max-h-64 rounded-lg mx-auto"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImagePreview}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-base">
                  Ingredients <span className="text-red-500">*</span>
                </Label>
                <Button className="cursor-pointer" type="button" variant="outline" size="sm" onClick={addIngredient}>
                  <Plus className="h-4 w-4 mr-2" /> Add Ingredient
                </Button>
              </div>

              {ingredients.length === 0 && (
                <div className="text-muted-foreground text-sm mb-2">
                  No ingredients added yet. Click the button above to add one.
                </div>
              )}

              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex items-center gap-2 border rounded-md p-2 bg-background">
                    <div className="flex flex-col space-y-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => moveIngredient(index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => moveIngredient(index, "down")}
                        disabled={index === ingredients.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={ingredient.value}
                      onChange={(e) => updateIngredient(ingredient.id, e.target.value)}
                      placeholder="Enter ingredient"
                      className="flex-1"
                    />
                    <Button className="cursor-pointer" type="button" variant="ghost" size="icon" onClick={() => removeIngredient(ingredient.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-base">
                  Instructions <span className="text-red-500">*</span>
                </Label>
                <Button className="cursor-pointer" type="button" variant="outline" size="sm" onClick={addInstruction}>
                  <Plus className="h-4 w-4 mr-2" /> Add Instruction
                </Button>
              </div>

              {instructions.length === 0 && (
                <div className="text-muted-foreground text-sm mb-2">
                  No instructions added yet. Click the button above to add one.
                </div>
              )}

              <div className="space-y-2">
                {instructions.map((instruction, index) => (
                  <div key={instruction.id} className="flex items-start gap-2 border rounded-md p-2 bg-background">
                    <div className="flex flex-col space-y-1 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => moveInstruction(index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => moveInstruction(index, "down")}
                        disabled={index === instructions.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-shrink-0 font-medium pt-2 w-7">{index + 1}.</div>
                    <Textarea
                      value={instruction.value}
                      onChange={(e) => updateInstruction(instruction.id, e.target.value)}
                      placeholder="Enter instruction step"
                      className="flex-1 min-h-[80px]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInstruction(instruction.id)}
                      className="flex-shrink-0 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full cursor-pointer">
                Save Recipe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

