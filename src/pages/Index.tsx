
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Terminal, AlertTriangle, Activity, Users, Globe, Database } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import RecentScanChart from '@/components/dashboard/RecentScanChart';
import ToolStatusPanel from '@/components/dashboard/ToolStatusPanel';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-cyber">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-cyber-dark border-cyber hover:shadow-md hover:shadow-cyber/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-cyber">Tools Available</CardTitle>
              <Terminal className="h-4 w-4 text-cyber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyber-foreground">5</div>
              <p className="text-xs text-muted-foreground">All tools ready</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border-cyber hover:shadow-md hover:shadow-cyber/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-cyber">Active Scans</CardTitle>
              <Activity className="h-4 w-4 text-cyber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyber-foreground">2</div>
              <p className="text-xs text-muted-foreground">1 will complete soon</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border-cyber hover:shadow-md hover:shadow-cyber/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-cyber">Protected Assets</CardTitle>
              <Shield className="h-4 w-4 text-cyber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyber-foreground">3</div>
              <p className="text-xs text-muted-foreground">All secure</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border-cyber hover:shadow-md hover:shadow-cyber/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-cyber">Detected Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-cyber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyber-foreground">1</div>
              <p className="text-xs text-muted-foreground">Low severity</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-cyber-dark border-cyber col-span-1">
            <CardHeader>
              <CardTitle className="text-cyber">Recent Scan Activity</CardTitle>
              <CardDescription>Scan activity across all tools</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentScanChart />
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border-cyber col-span-1">
            <CardHeader>
              <CardTitle className="text-cyber">Tool Status</CardTitle>
              <CardDescription>Current status of your tools</CardDescription>
            </CardHeader>
            <CardContent>
              <ToolStatusPanel />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-cyber-dark border-cyber col-span-2">
            <CardHeader>
              <CardTitle className="text-cyber">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center p-2 rounded-md hover:bg-cyber-muted">
                    <div className={`w-2 h-2 rounded-full mr-2 ${i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-cyber' : 'bg-yellow-500'}`}></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {i === 1 ? 'Social_Finder.py scan completed successfully' :
                          i === 2 ? 'endpoint_hunter.py detected new endpoints' :
                          i === 3 ? 'Warning: SQL injection vulnerability found by sql.py' :
                          i === 4 ? 'subs_Extractor.py discovered 3 new subdomains' :
                          'subdomain_extractor_new.py scan started'}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border-cyber">
            <CardHeader>
              <CardTitle className="text-cyber">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Link to="/tools" className="cyber-button w-full text-center">
                  Launch Tool
                </Link>
                <Link to="/tools/social" className="cyber-button w-full text-center">
                  Social Tools
                </Link>
                <Link to="/tools/reconnaissance" className="cyber-button w-full text-center">
                  Reconnaissance Tools
                </Link>
                <Link to="/tools/exploitation" className="cyber-button w-full text-center">
                  Exploitation Tools
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
