import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NeomorphicCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const NeomorphicCard: React.FC<NeomorphicCardProps> = ({
  title,
  description,
  icon,
  children,
  className = "",
}) => {
  return (
    <Card className={`relative bg-gradient-to-br from-sky-100/90 to-sky-50/80 backdrop-blur-xl border-2 border-sky-200/60 shadow-[8px_8px_24px_rgba(2,132,199,0.15),-8px_-8px_24px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_32px_rgba(2,132,199,0.2),-12px_-12px_32px_rgba(255,255,255,0.95)] transition-all duration-500 rounded-2xl overflow-hidden group ${className}`}>
      {/* Inner shadow for depth */}
      <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_8px_rgba(2,132,199,0.1),inset_-2px_-2px_8px_rgba(255,255,255,0.5)]" />
      
      {/* Glossy highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-sky-900 font-bold flex items-center gap-2 drop-shadow-sm">
          {icon && (
            <div className="p-2 bg-sky-200/50 rounded-lg shadow-[2px_2px_6px_rgba(2,132,199,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)]">
              {icon}
            </div>
          )}
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sky-700/90 font-medium">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0 space-y-4 relative z-10">
        {children}
      </CardContent>
    </Card>
  );
};
