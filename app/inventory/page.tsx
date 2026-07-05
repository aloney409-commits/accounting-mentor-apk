'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BackButton } from '@/components/ui/BackButton';
import { motion } from 'framer-motion';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('status'); // status, transfer, audit

  return (
    <main className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-bold">إدارة المخازن</h1>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button 
            variant={activeTab === 'status' ? 'default' : 'ui'} 
            onClick={() => setActiveTab('status')}
          >
            📦 حالة المخزون
          </Button>
          <Button 
            variant={activeTab === 'transfer' ? 'default' : 'ui'} 
            onClick={() => setActiveTab('transfer')}
          >
            🔄 تحويل مخزني
          </Button>
          <Button 
            variant={activeTab === 'audit' ? 'default' : 'ui'} 
            onClick={() => setActiveTab('audit')}
          >
            📋 جرد وتسوية
          </Button>
        </div>

        {activeTab === 'status' && (
          <div className="space-y-4">
            <Card className="p-4">
              <Input placeholder="بحث عن صنف (F9)..." />
            </Card>
            <div className="grid gap-3">
              {[
                { name: 'شاشة سامسونج 24', qty: 45, unit: 'حبة', cost: 150 },
                { name: 'لوحة مفاتيح ميكانيكية', qty: 120, unit: 'حبة', cost: 45 },
                { name: 'ماوس لاسلكي', qty: 8, unit: 'حبة', cost: 25 },
              ].map((item, idx) => (
                <Card key={idx} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">التكلفة: {item.cost} | الوحدة: {item.unit}</p>
                  </div>
                  <div className="text-left">
                    <p className={`text-xl font-black ${item.qty < 10 ? 'text-red-500' : 'text-primary'}`}>
                      {item.qty}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">الكمية الحالية</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transfer' && (
          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">من مخزن</label>
                <select className="w-full p-2 border rounded-md bg-background"><option>المخزن الرئيسي</option></select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">إلى مخزن</label>
                <select className="w-full p-2 border rounded-md bg-background"><option>مخزن الفروع</option></select>
              </div>
            </div>
            <div className="border-t pt-4">
              <Button variant="ui" className="w-full border-dashed">+ إضافة أصناف للتحويل</Button>
            </div>
            <Button className="w-full bg-primary text-white">تنفيذ التحويل (F10)</Button>
          </Card>
        )}

        {activeTab === 'audit' && (
          <Card className="p-8 text-center space-y-4">
            <div className="text-5xl">📋</div>
            <h2 className="text-xl font-bold">تسوية كميات الجرد</h2>
            <p className="text-muted-foreground text-sm">قم بإدخال الكمية الفعلية بعد الجرد اليدوي وسيقوم النظام باحتساب الفوارق (عجز/زيادة) آلياً.</p>
            <Button className="bg-primary text-white">بدء جرد جديد</Button>
          </Card>
        )}

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur shadow-lg border rounded-full px-6 py-3 flex gap-4 text-xs font-bold text-muted-foreground">
          <span>F6: إضافة</span>
          <span>F10: حفظ</span>
          <span>F5: عرض</span>
          <span>F9: بحث</span>
        </div>
      </div>
    </main>
  );
}
