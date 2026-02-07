'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loading, LoadingSkeleton } from '@/components/ui/loading';
import { useUIStore } from '@/lib/store/ui-store';

export default function TestUIPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useUIStore();

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">UI Components Test</h1>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Different button variants and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button isLoading onClick={handleClick}>
                Loading Button
              </Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Form inputs with labels and errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Email" type="email" placeholder="Enter your email" />
            <Input label="Password" type="password" placeholder="Enter password" />
            <Input
              label="With Error"
              type="text"
              error="This field is required"
              placeholder="This has an error"
            />
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Loading States */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>Spinners and skeletons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-center">
              <Loading size="sm" />
              <Loading size="md" />
              <Loading size="lg" />
            </div>
            <div className="space-y-2">
              <LoadingSkeleton className="h-4 w-full" />
              <LoadingSkeleton className="h-4 w-3/4" />
              <LoadingSkeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>

        {/* Toast Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Click buttons to show toasts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => showToast('Success message!', 'success')}>
                Show Success
              </Button>
              <Button onClick={() => showToast('Error occurred!', 'error')}>
                Show Error
              </Button>
              <Button onClick={() => showToast('Warning message!', 'warning')}>
                Show Warning
              </Button>
              <Button onClick={() => showToast('Info message!', 'info')}>
                Show Info
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
