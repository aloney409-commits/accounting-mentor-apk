'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BackButton } from '@/components/ui/BackButton';
import { motion } from 'framer-motion';

export default function PurchasesPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'شاشة سامسونج 24', qty: 10, price: 150, total: 1500 },
    { id: 2, name: 'لوحة مفاتيح ميكانيكية', qty: 20, price: 45, total: 900 },
  ]);

  return (
    <main className="min-h-screen p-4 pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-bold">فاتورة مشتريات</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ui">تعليق</Button>
            <Button className="bg-green-600 text-white">حفظ (F10)</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 space-y-4 col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">المخزن</label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>المخزن الرئيسي</option>
                  <option>مخزن الفروع</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">المورد</label>
                <Input placeholder="F9 للبحث عن مورد..." />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="p-2">الصنف</th>
                    <th className="p-2">الكمية</th>
                    <th className="p-2">السعر</th>
                    <th className="p-2">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2 font-bold">{item.name}</td>
                      <td className="p-2">{item.qty}</td>
                      <td className="p-2">{item.price}</td>
                      <td className="p-2 font-mono">{item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="ui" className="w-full border-dashed">+ إضافة صنف (F6)</Button>
          </Card>

          <Card className="p-4 space-y-6 h-fit bg-primary/5 border-primary/20">
            <h2 className="font-bold border-b pb-2">ملخص الفاتورة</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>الإجمالي المحلي</span>
                <span className="font-mono">2,400.00</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>الخصم</span>
                <span className="font-mono">0.00</span>
              </div>
              <div className="flex justify-between text-green-600 font-bold text-xl border-t pt-4">
                <span>الصافي</span>
                <span className="font-mono">2,400.00</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">طريقة الدفع</label>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="ui">نقداً</Button>
                <Button size="sm" className="bg-primary text-white">آجل</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
