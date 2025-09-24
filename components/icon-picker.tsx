"use client"

import * as React from "react"
import { Check, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify-icon/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
}

let timer: any;

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("Activities");
  const [categories, setCategories] = React.useState([{ name: "", key: "", icons: [] }]);
  const [iconSet, setIconSet] = React.useState([""]);
  const [filteredIcons, setFilteredIcons] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const resp = await (
        await fetch(
          `https://api.iconify.design/collection?prefix=twemoji&chars=true&aliases=true`
        )
      ).json();

      setIconSet(Object.values(resp.categories)?.flat());
      setCategories(Object.keys(resp.categories).map((category) => ({
        name: category,
        key: category,
        icons: resp.categories[category]
      })));
      setActiveTab("Activities")
    })()
  }, []);

  const handleIconSelect = (iconName: string) => {
    onChange(iconName)
    setOpen(false)
    setSearchTerm("")
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSearchTerm("")
    }
  }

  const handleFilter = (value: string) => {
    setSearchTerm(value);
    clearTimeout(timer);

    timer = setTimeout(async () => {
      setFilteredIcons(iconSet.filter((name) => name.toLowerCase().includes(value.toLowerCase())));
      clearTimeout(timer);
    }, 1500);
  }


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-10" type="button" onClick={() => handleOpenChange(!open)}>
          <div className="flex items-center gap-6">
            <Icon height={20} width={20} icon={value} className="h-4 w-4" />
            <span className="truncate">{value.replace("twemoji:", "") || " Select icon"}</span>
          </div>
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Choose an Icon</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Content */}
          {searchTerm ? (
            // Search Results
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Found {filteredIcons.length} icons matching "{searchTerm}"
              </div>
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-8 gap-2 p-2">
                  {filteredIcons.map((iconName) => {
                    return (
                      <Button
                        key={iconName}
                        variant="ghost"
                        className={cn(
                          "relative h-14 w-14 p-0 hover:bg-accent flex flex-col items-center justify-center",
                          value === iconName && "bg-accent ring-2 ring-primary",
                        )}
                        onClick={() => handleIconSelect(iconName)}
                        type="button"
                        title={iconName}
                      >
                        <Icon height={28} width={28} icon={"twemoji:"+iconName} className="h-8 w-8" />
                        {value === iconName && (
                          <Check className="absolute -right-1 -top-1 h-3 w-3 text-primary bg-background rounded-full" />
                        )}
                      </Button>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          ) : (
            // Category Tabs
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <ScrollArea className="w-full">
                <TabsList className="grid w-full h-full grid-cols-9">
                  {categories.map((category) => (
                    <TabsTrigger key={category.key} value={category.key} className="text-xs px-2">
                      {category.name.split(" ")[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>

              {categories.map((category) => (
                <TabsContent key={category.key} value={category.key} className="mt-4">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4 p-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {category.name} ({category.icons.length} icons)
                      </h3>
                      <div className="grid grid-cols-8 gap-2">
                        {category.icons.map((iconName) => {
                          return (
                            <Button
                              key={iconName}
                              variant="ghost"
                              className={cn(
                                "relative h-14 w-14 p-0 hover:bg-accent flex flex-col items-center justify-center",
                                value === iconName && "bg-accent ring-2 ring-primary",
                              )}
                              onClick={() => handleIconSelect(iconName)}
                              type="button"
                              title={iconName}
                            >
                              <Icon height={28} width={28} icon={"twemoji:"+iconName} className="h-8 w-8" />
                              {value === iconName && (
                                <Check className="absolute -right-1 -top-1 h-3 w-3 text-primary bg-background rounded-full" />
                              )}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
