'use server';

import LxcContainersService from "@/actions/lxc/lxc.containers.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
;

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Running':
      return 'bg-green-100 text-green-800';
    case 'Inativo':
      return 'bg-red-100 text-red-800';
    case 'Pendente':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default async function Home() {
  const instances = await new LxcContainersService().listContainers();
  const containers = instances.filter((con: any) => con.type === "container")
  const vms = instances.filter((vm: any) => vm.type === "virtual-machine")
  const storages: any[] = []
  const networks: any[] = []

  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-8 lg:p-12 bg-background">
      <div className="w-full max-w-7xl space-y-8 rounded-lg">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>CPU Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold flex items-center gap-2">
                  65% <span className="text-sm text-muted-foreground font-normal">Intel i7-8700</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full transition-all" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>6 Cores / 12 Threads</span>
                  <span>3.2GHz - 4.6GHz</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Memory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold flex items-center gap-2">
                  8.4GB <span className="text-sm text-muted-foreground font-normal">of 16GB</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full transition-all" style={{ width: '52.5%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>DDR4 2400MHz</span>
                  <span>Ubuntu 22.04 LTS</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold flex items-center gap-2">
                  256GB <span className="text-sm text-muted-foreground font-normal">of 512GB</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full transition-all" style={{ width: '50%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>NVMe SSD</span>
                  <span>500MB/s</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Network Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold flex items-center gap-2">
                  450MB/s <span className="text-sm text-muted-foreground font-normal">1Gbps</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full transition-all" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>eth0</span>
                  <span>TX: 2.1GB RX: 1.8GB</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Machines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vms?.length || 0}</div>
              <ScrollArea className="h-[200px] mt-4">
                {vms.map((vm: any) => (
                  <div key={vm.name} className="flex items-center justify-between py-2">
                    <span>{vm.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(vm.status)}`}>
                      {vm.status}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Containers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{containers?.length || 0}</div>
              <ScrollArea className="h-[200px] mt-4">
                {containers.map((container: any) => (
                  <div key={container.name} className="flex items-center justify-between py-2">
                    <span>{container.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(container.status)}`}>
                      {container.status}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Pools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storages?.length || 0}</div>
              <ScrollArea className="h-[200px] mt-4">
                {storages?.map((storage) => (
                  <div key={storage.name} className="flex items-center justify-between py-2">
                    <span>{storage.name}</span>
                    <span className="text-sm text-muted-foreground">{storage.driver}</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Networks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networks?.length || 0}</div>
              <ScrollArea className="h-[200px] mt-4">
                {networks?.map((network) => (
                  <div key={network.name} className="flex items-center justify-between py-2">
                    <span>{network.name}</span>
                    <span className="text-sm text-muted-foreground">{network.type}</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}