import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { FormValues } from '@/lib/validation/campaign';
import { postAdminWorshipPlaces, postAdminCampaigns, postAdminCampaignsByIdAssets } from '@/lib/api/generated/sdk.gen';
import { useCampaignImageUpload } from './useCampaignImageUpload';

export function useCampaignMutation() {
  const queryClient = useQueryClient();
  const { uploadImage } = useCampaignImageUpload();

  return useMutation({
    mutationFn: async (formValues: FormValues) => {
      // Step 1: Create or select worship place
      let worshipPlaceId = formValues.selectedWorshipPlaceId;

      if (!worshipPlaceId) {
        const wpResponse = await postAdminWorshipPlaces({
          throwOnError: true,
          body: {
            name: formValues.namaRumahIbadah,
            religionType: formValues.agama as 'Masjid' | 'Mushalla' | 'Gereja' | 'Pura' | 'Vihara' | 'Klenteng',
            address: formValues.alamatRumahIbadah,
            city: formValues.domisili,
            contactPerson: formValues.namaNarahubung || undefined,
            contactPhone: formValues.noTelpNarahubung ? `+62${formValues.noTelpNarahubung}` : undefined,
            currentCondition: formValues.kondisiSaatIni || undefined,
            personInCharge: formValues.informasiPenanggungJawab || undefined,
          },
        });

        if (!wpResponse || !wpResponse.data || !wpResponse.data.id) {
          throw new Error('Gagal membuat data rumah ibadah baru');
        }
        worshipPlaceId = wpResponse.data.id;
      }

      // Step 2: Upload Cover Image (if a new file is selected)
      let assetId: string | null = null;
      if (formValues.coverImageFile) {
        try {
          assetId = await uploadImage(formValues.coverImageFile);
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan';
          throw new Error(`Gagal mengunggah foto sampul: ${errMsg}`);
        }
      }

      // Step 3: Create Campaign
      const cleanTarget = formValues.targetDana.replace(/\./g, '');
      const targetVal = Number(cleanTarget);

      // Parse batas waktu into ISO datetime (UTC)
      const dd = formValues.batasWaktuDD.padStart(2, '0');
      const mm = formValues.batasWaktuMM.padStart(2, '0');
      const yyyy = formValues.batasWaktuYYYY;
      const dateStr = `${yyyy}-${mm}-${dd}T00:00:00Z`;

      const cleanSavings = formValues.penghematanBiaya.replace(/\./g, '');
      const savingsVal = Number(cleanSavings);

      const campaignResponse = await postAdminCampaigns({
        throwOnError: true,
        body: {
          title: formValues.judulKampanye,
          description: formValues.deskripsiKampanye,
          targetIdr: targetVal,
          panelCapacityKwp: formValues.panelCapacityKwp,
          deadline: dateStr,
          worshipPlaceId: worshipPlaceId as string,
          fundUsage: formValues.tujuanPenggunaanDana || undefined,
          energyProducedKwhMonthly: formValues.energiDihasilkan || undefined,
          beneficiaries: formValues.jumlahPenerima ? Number(formValues.jumlahPenerima) : undefined,
          carbonReductionKgMonthly: formValues.penurunanEmisi || undefined,
          electricitySavingsIdrMonthly: formValues.penghematanBiaya ? savingsVal : undefined,
          impactDescription: formValues.deskripsiDampak || undefined,
        },
      });

      if (!campaignResponse || !campaignResponse.data || !campaignResponse.data.data || !campaignResponse.data.data.id) {
        throw new Error('Gagal membuat kampanye baru');
      }

      const campaignId = campaignResponse.data.data.id;

      // Step 4: Attach Cover Image Asset to Campaign (if uploaded)
      if (assetId) {
        const attachResponse = await postAdminCampaignsByIdAssets({
          throwOnError: true,
          path: {
            id: campaignId,
          },
          body: {
            assetId,
            kind: 'cover',
            sortOrder: 0,
          },
        });

        if (!attachResponse || !attachResponse.data || !attachResponse.data.success) {
          // eslint-disable-next-line no-console
          console.error('Failed to attach cover image asset to campaign:', campaignId);
          toast.warning('Kampanye berhasil dibuat, tetapi gagal memasang gambar sampul.');
        }
      }

      return campaignResponse.data.data;
    },
    onSuccess: () => {
      // Invalidate admin campaigns list to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ['getAdminCampaigns'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getCampaigns'],
      });
    },
  });
}
export default useCampaignMutation;
