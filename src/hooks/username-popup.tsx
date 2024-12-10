'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from '@/components/Providers/fetchAPI';
import { useUsernameStore } from "@/components/Providers/contextProvider"; // Zustand store
import { FloatingLabelInput } from '@/components/ui/floating-label-input';



export default function UsernamePopup() {
  const [temp, setTemp] = useState('');
  const { username, setUsername } = useUsernameStore() as { username: string; setUsername: (username: string) => void };
  const { fetchData } = useStore() as {
    fetchData: (username: string) => void;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (temp.trim()) {
      setUsername(temp);
      fetchData(temp);
    }
  };

  return (
    <Dialog open={username === ""}>
      <DialogContent className="sm:max-w-[425px] text-card-foreground w-full max-w-full mx-2">
        <DialogHeader>
          <DialogDescription>
            Please enter your username to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="relative grid gap-10 pb-4 ">
            <FloatingLabelInput id="floating-demo" label="Username" type='text' value={temp}
              onChange={(e) => setTemp(e.target.value)}
              autoComplete="off" />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="mt-5 rounded bg-primary text-primary-foreground"
            >
              Set Username
          </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
