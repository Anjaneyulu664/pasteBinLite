import React from "react";

export const metadata = {
  title: "PasteBin Lite",
  description: "Simple paste sharing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
