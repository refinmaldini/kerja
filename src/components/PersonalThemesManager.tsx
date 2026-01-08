import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Moon, Sun, Palette } from 'lucide-react';
import { themeColors, applyTheme } from '@/utils/theme';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface PersonalThemesManagerProps {
  currentTheme?: string;
  onChange: (theme: string) => void;
}

const PersonalThemesManager: React.FC<PersonalThemesManagerProps> = ({ currentTheme, onChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'default');

  const themes = Object.entries(themeColors).map(([id, colors]) => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1'),
    description: getDescription(id),
    colors
  }));

  function getDescription(id: string): string {
    const descriptions: Record<string, string> = {
      default: 'Classic light theme',
      dark: 'Comfortable dark theme',
      ocean: 'Blue and teal tones',
      sunset: 'Warm orange and red tones',
      forest: 'Natural green tones',
      lavender: 'Soft purple tones'
    };
    return descriptions[id] || 'Custom theme';
  }

  useEffect(() => {
    // Apply theme to document root
    applyTheme(selectedTheme);
  }, [selectedTheme]);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    applyTheme(themeId);
    onChange(themeId);
  };

  const handleContainerClick = (themeId: string) => {
    // Focus the radio button to ensure it's selected
    const radioElement = document.getElementById(themeId) as HTMLInputElement;
    if (radioElement) {
      radioElement.focus();
      radioElement.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette size={20} />
          Personal Themes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedTheme} onValueChange={handleThemeChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? 'ring-2 ring-primary border-primary'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleContainerClick(theme.id)}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem
                  value={theme.id}
                  id={theme.id}
                  className="mt-1 h-5 w-5"
                />
                <div className="space-y-1">
                  <Label htmlFor={theme.id} className="font-medium">
                    {theme.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {theme.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: `hsl(${theme.colors.primary})`,
                        borderColor: 'hsl(222.2 47.4% 11.2%)'
                      }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: `hsl(${theme.colors.secondary})`,
                        borderColor: 'hsl(222.2 47.4% 11.2%)'
                      }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: `hsl(${theme.colors.accent})`,
                        borderColor: 'hsl(222.2 47.4% 11.2%)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-6 flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <h4 className="font-medium">Current Theme</h4>
            <p className="text-sm text-muted-foreground">
              {themes.find(t => t.id === selectedTheme)?.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedTheme === 'default' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleThemeChange('default')}
            >
              <Sun size={16} className="mr-2" />
              Light
            </Button>
            <Button
              variant={selectedTheme === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleThemeChange('dark')}
            >
              <Moon size={16} className="mr-2" />
              Dark
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalThemesManager;